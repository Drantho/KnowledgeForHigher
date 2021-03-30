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
            include: [{
                model: db.Tag,
                through: { attributes: [] }
            }, {
                model: db.User
            }]
        }).then((result) => {
            return response.json(result);

        }).catch((err) => {
            console.log(err)
            response.status(500).json(err);
            return;
        });
    }

    else {


        const includes = [{
                model: db.Tag,
                through: { attributes: [] },            
            },
            {
                model: db.User,
                attributes: ["id", "userName", "portrait"]
            },
            {
                model: db.Rating,             
            }
        ];

        // If a tag name is provided, include the Tags table and specify which tag
        if (request.query.tag) {
            includes.push({
                model: db.Tag,
                where: { name: request.query.tag },
                attributes: [],
                through: { attributes: [] }
            });
        } else if (request.query.tags) {
            includes.push({
                model: db.Tag,
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
        queryParams['where'] = {
            '$Tags.name$': { [Op.in]: request.query.tags.split(',') }
        }

        // Add a search condition to the query if one is provided
        // if (request.query.search) {
        //     queryParams["where"] = {
        //         [Op.or]: [
        //             { title: { [Op.like]: '%' + request.query.search + '%' } },
        //             { text: { [Op.like]: '%' + request.query.search + '%' } }
        //         ]
        //     };
        // }

        db.Question.findAll(queryParams)
            .then((result) => {
                response.json(result);
            }).catch((err) => {
                response.status(500).json(err);
            });
    }

});

router.get('/feed', (req, res) => {
    const tagNames = req.query.tags.split(',');
    console.log(tagNames);

    db.Question.findAll({
        attributes: ['id'],
        include: [{
            model: db.Tag,
            where: { name: { [ Op.in ]: tagNames } }
        }]
    }).then( questions => {
        
        db.Question.findAll({
            where: {
                id: { [Op.in]: questions.map( e => e.id ) }
            },
            include: [{
                model: db.Tag, 
                through: { attributes: [] }
            }, {
                model: db.User,
                attributes: ["id", "userName", "portrait"]
            }, {
                model: db.Rating,
            }]
        }).then( (result) => {
            res.json(result);
        }).catch( (err) => {
            res.status(500).json(err);
        });
    }).catch( (err) => {
        console.log(err);
    })
});

// Get a list of unique questions when passed an array of tag names
// Also conditionally show/hide tags based on "show" property
router.get("/uniqueQuestionsByTags", (request, response) => {

    db.Question.findAll({
        attributes: ["id"],
        include: [
            {
                model: db.Tag,
                where: {
                    [Op.or]: request.query.tags.split(',')
                },
                through: { attributes: [] }
            }
        ]
    }).then(data => {
        console.log(data);
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

        if (request.body.tags) {

            db.Tag.findAll({
                where: {
                    name: { [Op.in] : request.body.tags }
                }
            }).then( (findResult) => {
                const ids = findResult.map( e => e.dataValues.id);
                const found = findResult.map(e => e.dataValues.name);
                const toCreate = request.body.tags.filter( e => !found.includes(e));

                db.Tag.bulkCreate(toCreate.map( e => ({name: e}))).then( (createResult) => {
                    ids.push(...(createResult.map( e => e.dataValues.id )));
                    db.sequelize.models.question_tags.bulkCreate(
                        ids.map( e => ({ QuestionId: result.dataValues.id, TagId: e }) )
                    ).then( (linkResult) => {
                        const output = [];
                        output.push(`These tags already existed: ${findResult.map( e => e.dataValues.name)}`);
                        output.push(`These tags were created: ${createResult.map( e => e.dataValues.name)}`);
                        output.push(`Linked tags ${linkResult.map( e => e.TagId)} to question`);
                        console.log(output);
                        response.json({
                            tagDetails: output,
                            ...result.dataValues
                        });
                    }).catch( (err) => {
                        response.status(500).json(err);
                    })
                }).catch( (err) => {
                    response.status(500).json(err);
                })
            }).catch( (err) => {
                response.status(500).json(err);
            });

        } else {
            response.json(result);
        }
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

module.exports = router;