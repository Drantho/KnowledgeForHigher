const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require("jsonwebtoken")
const authenticate = require("../utils/authenticate");
const profanityCheck = require('../utils/profanityFilter');

const { Op } = require('sequelize');
const { Sequelize } = require('../models');

router.get('/', (request, response) => {

    if (request.query.id) {
        console.log(`req.query.id: `, request.query.id);
        db.Question.findOne({
            where: {
                id: request.query.id
            },
            attributes: ['id', 'title', 'text', 'updatedAt'],
            include: {
                model: db.Tag,
                through: { attributes: [] }
            }
        }).then((result) => {
            return response.json(result);

        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    }

    else {


        const includes = [{
            model: db.Tag,
            through: { attributes: [] }
        }];

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
                attributes: ["id", "userName", "portrait"]
            });
        }

        const queryParams = { include: includes };

        // Add a search condition to the query if one is provided
        if (request.query.search) {
            queryParams["where"] = {
                [Op.or]: [
                    { title: { [Op.like]: '%' + request.query.search + '%' } },
                    { text: { [Op.like]: '%' + request.query.search + '%' } }
                ]
            };
        }

        db.Question.findAll(queryParams)
            .then((result) => {
                response.json(result);
            }).catch((err) => {
                response.status(500).json(err);
            });
    }

});

// Get a list of unique questions when passed an array of tag names
// Also conditionally show/hide tags based on "show" property
router.post("/uniqueQuestionsByTags", (request, response) => {

    db.Question.findAll({
        attributes: ["id"],
        include: [
            {
                model: db.Tag,
                where: {
                    [Op.or]: request.body.tags.map(tag => tag.show ? {name: tag.name} : null)
                },
                through: { attributes: [] }
            }
        ]
    }).then(data => {
        questionsArr = [];
        data.forEach(question => questionsArr.push({ id: question.id }));

        db.Question.findAll({
            where: {
                [Op.or]: data.map(question => {return {id: question.id}})
            },
            include: [
                {
                    model: db.Tag,
                    through: { attributes: [] }
                },
                {
                    model: db.Answer
                },
                {
                    model: db.Rating
                },
                {
                    model: db.User,
                    attributes: ["id", "userName", "portrait"]
                }
            ]
        }).then(data => {
            response.json(data);
        });
    }).catch(err => {
        console.log(err);
        response.status(500).json(err)
    })
});

// Retreive all unanswered questions
router.get('/unanswered', (request, response) => {
    db.Question.findAll({
        where: { isAnswered: false }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Create a question
router.post('/', authenticate, (request, response) => {

    if (profanityCheck(request.body.title + ' ' + request.body.text)) {
        response.status(400).json({
            err: 'Question title or body contains disallowed term/phrase'
        });
        return;
    }

    db.Question.create({
        title: request.body.title,
        text: request.body.text,
        UserId: request.userId
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Deactivate a question
router.put('/deactivate/:id', authenticate, (request, response) => {
    db.Question.update({ isActive: false }, {
        where: [{
            id: request.params.id
        },
        {
            UserId: request.userId
        }]
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Delete a question (will delete any attached comments, answers, ratings)
// router.delete('/:id', (request, response) => {
//     db.Question.destroy({
//         where: { id: request.params.id }
//     }).then((result) => {
//         response.json(result);
//     }).catch((err) => {
//         response.status(500).json(err);
//     });
// });

module.exports = router;