const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");
const profanityCheck = require('../utils/profanityFilter');


const { Op } = require('sequelize');

router.get('/', (request, response) => {
    // Find an individual answer
    if (request.query.id) {
        db.Answer.findOne({
            where: { id: request.query.id },
            include:[{ 
                model: db.User,
                attributes: ["userName", "id", "portrait"]
            },
            {
                model: db.Rating
            },
            {
                model: db.Question, 

                include: 
                {
                    model:db.Tag,
                    through: {attributes: []}
                }
            }
        ]
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }

    // Get all of a question's answers
    if (request.query.question) {
        db.Answer.findAll({
            include: [{
                model: db.Question,
                where: { id: request.query.question },
                attributes: []
            },{
                model: db.User
            },
            {
                model: db.Rating
        }]
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }

    // Find all of a user's answers
    if (request.query.user) {
        db.Answer.findAll({
            include: [{
                model: db.User,
                where: { id: request.query.user },
                attributes: []
            },
            {
                model: db.Question, 

                include: 
                {
                    model:db.Tag,
                    through: {attributes: []}
                }
            },
            {
                model: db.Rating
            }]
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }
});

// Create an answer
router.post('/', authenticate, (request, response) => {

    if (profanityCheck(request.body.text)) {
        response.status(400).json({
            err: 'Answer body contains disallowed term/phrase'
        });
        return;
    }

    db.Answer.create({
        text: request.body.text,
        UserId: request.userId,
        QuestionId: request.body.question
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.put('/', authenticate, (request, response) => {
    if (profanityCheck(request.body.name + ' ' + request.body.description)) {
        response.status(400).json({
            err: 'Answer body contains disallowed term/phrase'
        });
        return;
    }

    db.Answer.update({ text: request.body.text }, {
        where: [{ id: request.body.id },
            {UserId: request.userId}
        ]
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Delete an individual Answer (will also delete any of its comments and ratings)
router.delete('/:id', authenticate, (request, response) => {
    db.Answer.destroy({
        where: [{ id: request.params.id },
            {UserId: request.userId}
        ]
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;