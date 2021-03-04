const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");
const profanityCheck = require('../utils/profanityFilter');


const { Op } = require('sequelize');

router.get('/', (request, response) => {
    // find an individual service

    const includes = [{
        model: db.Tag,
        through: { attributes: [] }
    }, {
        model: db.User,
    }, {
        model: db.Rating
    }];

    if (request.query.id) {
        db.Service.findOne({
            where: { id: request.query.id },
            include: includes
        }).then((result) => {
            response.json(result);
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    } else {

        // If a user ID is provided, get all services offered by that user
        if (request.query.user) {
            includes.push({
                model: db.User,
                where: { id: request.query.user },
                attributes: []
            });
        }

        // If a tag name is specified, get all services with that tag name
        if (request.query.tag) {
            includes.push({
                model: db.Tag,
                where: { name: request.query.tag },
                attributes: [],
                through: { attributes: [] }
            });
        }

        const queryParams = { include: includes };

        // Add a search condition to the query if one is provided
        if (request.query.search) {
            queryParams[where] = {
                [Op.or]: [
                    { name: { [Op.like]: '%' + request.query.search + '%' } },
                    { description: { [Op.like]: '%' + request.query.search + '%' } }
                ]
            };
        }

        db.Service.findAll(queryParams)
            .then((result) => {
                response.json(result);
            }).catch((err) => {
                console.log(err);
                response.status(500).json(err);
            });
    }
});

router.post('/', authenticate, (request, response) => {
    if (profanityCheck(request.body.name + ' ' + request.body.description)) {
        response.status(400).json({
            err: 'Service name or description contains disallowed term/phrase'
        });
        return;
    }

    db.Service.create({
        name: request.body.name,
        description: request.body.description,
        UserId: request.userId,
        price: request.body.price
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        console.log(err);
        response.status(500).json(err);
    })
});

// Get a list of unique services when passed an array of tag names
// Also conditionally show/hide tags based on "show" property
router.post("/uniqueServicesByTags", (req, res) => {

    db.Service.findAll({
        attributes: ["id"],
        include: [{
            model: db.Tag,
            where: {
                [Op.or]: req.body.tags.map(tag => tag.show ? { name: tag.name } : null)
            },
            through: { attributes: [] }
        }]
    }).then(data => {
        db.Service.findAll({
            where: {
                [Op.or]: data.map(service => { return { id: service.id } })
            },
            include: [{
                model: db.Tag,
                through: { attributes: [] }
            }, {
                model: db.User,
                attributes: ["id", "userName"]
            },
            {
                model: db.Rating
            },
            {
                model: db.User,
                attributes: ["id", "userName", "portrait"]
            }]
        }).then(data => {
            res.json(data);
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

// Utilize the 'delete' method to deactivate a service
router.delete('/:id', authenticate, (request, response) => {
    db.Service.update({ isActive: false }, {
        where: { id: request.params.id }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

module.exports = router;