const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');

router.get('/', (request, response) => {
    // find an individual service
    if (request.query.id) {
        db.Service.findOne({
            where: { id: request.query.id }
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    const includes = [];

    // If a user ID is provided, get all services offered by that user
    if (request.query.user) {
        includes.push({
            model: db.User,
            where: { id: request.query.user },
            attributes: [],
            through: { attributes: [] }
        });
    }

    // If a tag name is specified, get all services with that tag name
    if (request.query.tag) {
        includes.push({
            model:      db.Tag,
            where:      { name: request.query.tag },
            attributes: [],
            through:    { attributes: [] }
        });
    }

    const queryParams = { include: includes };

    // Add a search condition to the query if one is provided
    if (request.query.search) {
        queryParams[where] = {
            [Op.or]: [
                { name:        { [Op.like]: '%' + request.query.search + '%' } },
                { description: { [Op.like]: '%' + request.query.search + '%' } }
            ]
        };
    }

    db.Service.findAll(queryParams)
        .then((result) => {
            response.json(result);
        }).catch((err) => {
            response.status(500).json(err);
        });
});

router.post('/', (request, response) => {
    db.Service.create({
        name: request.body.name,
        description: request.body.description,
        UserId: request.body.user
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    })
});

// Utilize the 'delete' method to deactivate a service
router.delete('/:id', (request, response) => {
    db.Service.update({ isActive: false }, {
        where: { id: request.params.id }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;