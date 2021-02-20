const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');

router.get('/', (request, response) => {

    if (request.query.id) {
        db.Question.findOne({
            where: {
                id: request.query.id
            },
            attributes: ['id', 'title', 'text', 'updatedAt'],
            include: {
              model: db.Tag,
              through: { attributes: [] } 
            }
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    const includes = [];

    // If a tag name is provided, include the Tags table and specify which tag
    if (request.query.tag) {
        includes.push({
            model: db.Tag,
            where: { name: request.query.tag },
            attributes: [],
            through: { attributes: [] }
        });
    }
    
    // If a user ID is provided, include the Users table and specify which user
    if (request.query.user) {
        includes.push({
            model: db.User,
            where: { id: request.query.user },
            attributes: [],
            through: { attributes: [] }
        });
    }

    const queryParams = { include: includes };

    // Add a search condition to the query if one is provided
    if (request.query.search) {
        queryParams["where"] = {
            [ Op.or ]: [
                { title: { [Op.like ]: '%' + request.query.search + '%'} },
                { text:  { [Op.like]: '%' + request.query.search + '%' } }
            ]
        };
    }

    db.Question.findAll( queryParams )
        .then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });

});

// Retreive all unanswered questions
router.get('/unanswered', (request, response) => {
    db.Question.findAll({
        where: { isAnswered: false }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Create a question
router.post('/', (request, response) => {
    db.Question.create({
        title: request.body.title,
        text: request.body.text,
        UserId: request.body.user
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Deactivate a question
router.put('/deactivate/:id', (request, response) => {
    db.Question.update({ isActive: false }, {
        where: { id: request.params.id }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Delete a question (will delete any attached comments, answers, ratings)
router.delete('/:id', (request, response) => {
    db.Question.destroy({
        where: { id: request.params.id }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;