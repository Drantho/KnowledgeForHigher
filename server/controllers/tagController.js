const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");
const profanityCheck = require('../utils/profanityFilter');

const { Op, Sequelize } = require('sequelize');
const { request, response } = require('express');

router.get('/', (request, response) => {

    // Get individual tag by ID or by NAME
    if (request.query.id || request.query.name) {
        const condition = {};
        if (request.query.id) { condition.id = request.query.id; }
        else { condition.name = request.query.name; }

        db.Tag.findOne({
            where: condition,
            include: [{
                model: db.Question,
                through: { attributes: [] },
                include: [{
                    model: db.User
                }, {
                    model: db.Tag  
                }]
            },
            {
                model: db.Service,
                through: { attributes: [] },
                where: {
                    active: true
                },
                required: false,
                include: [{
                    model: db.User
                }, {
                    model: db.Tag,
                    through: { attributes: [] }
                }]
            }]
        }).then((result) => {
            response.json(result);
            return;
        }).catch((err) => {
            console.log(err);
            response.status(500).json(err);
            return;
        });
    }

    // If a user ID is provided, get all tags that said user is following
    if (request.query.user) {
        console.log(`finding user tags`);
        db.Tag.findAll({
            include: [{
                model: db.User,
                through: { attributes: [] },
                attributes: [],
                where: {
                    id: request.query.user
                }
            }]
        }).then((result) => {
            response.json(result);
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    }

    // If a question ID is provided get all tags linked to said question
    if (request.query.question) {
        db.Tag.findAll({
            include: {
                model: db.Question,
                where: { id: request.query.question },
                attributes: [],
                through: { attributes: [] }
            }
        }).then((result) => {
            response.json(result);
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    }

    // If a service ID is provided get all tags linked to said service
    if (request.query.service) {
        db.Tag.findAll({
            include: {
                model: db.Service,
                where: { id: request.query.service },
                attributes: [],
                through: { attributes: [] }
            }
        }).then((result) => {
            response.json(result);
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    }

    if (request.query.search) {
        db.Tag.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: '%' + request.query.search + '%' } },
                    { description: { [Op.like]: '%' + request.query.search + '%' } }
                ]
            }
        }).then((result) => {
            response.json(result);
        }).catch((err) => {
            console.log(err);
            response.status(500).json(err);
        });
    }

});

router.get("/popular", (request, response) => {
    db.Tag.findAll({
        limit: 5,
        subQuery: false,
        group: ["Tag.id"],
        includeIgnoreAttributes:false,
        include: [{
            model: db.Question
        }],
        attributes: [
            "id",
            "name",
            [db.sequelize.fn("COUNT", db.sequelize.col("questions.id")), "QuestionCount"],
        ],
        order: [[db.sequelize.fn("COUNT", db.sequelize.col("questions.id")), "DESC"]]
    }).then(data => {
        response.json(data)
    })
})

router.post('/', authenticate, (request, response) => {

    if (profanityCheck(request.body.name + ' ' + request.body.description)) {
        response.status(400).json({
            err: 'Tag contains disallowed term/phrase'
        });
        return;
    }

    db.Tag.findOne({
        where: { name: request.body.name }
    }).then((result) => {
        if (result) {
            response.json(result);
        } else {
            db.Tag.create({
                name: request.body.name,
                description: request.body.description
            }).then((result) => {
                return response.json(result);
            }).catch((err) => {
                return response.status(500).json(err);
            });
        }
    }).catch((err) => {
        response.status(500).json(err);
    });
});

router.put('/description', authenticate, (request, response) => {
    if (profanityCheck(request.body.description)) {
        response.status(400).json({
            err: 'Tag contains disallowed term/phrase'
        });
        return;
    }

    db.Tag.update({
        description: request.body.description
    }, {
        where: { id: request.body.id }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

router.put('/user/:tagName', authenticate, ( request, response ) => {

    db.Tag.findOne({
        where: { 
            name: request.params.tagName
        }
    }).then( (result) => {
        if (result) {
            // Check if user already follows this tag
            db.sequelize.models.following.findOne( {
                where: {
                    TagId: result.dataValues.id,
                    UserId: request.userId
                }
            }).then( (findLinkResult) => {
               if (findLinkResult) {
                   return;
               } else {
                   // Create a link
                   db.sequelize.models.following.create( {
                       TagId: result.id,
                       UserId: request.userId
                   }).then( (result) => {
                       response.json(result);
                   }).catch( (err) => {
                       response.status(500).json(err);
                   });
               }
            }).catch( (err) => {
                response.status(500).json(err);
            });
        } else {
            db.Tag.create({
                name: request.params.tagName
            }).then( (createResult) => {
                db.sequelize.models.following.create( {
                    TagId: createResult.dataValues.id,
                    UserId: request.userId
                }).then( (linkResult) => {
                    response.json({
                        msg: `User ${request.userId} now following tag ${linkResult.dataValues.TagId}`
                    });
                }).catch( (err) => {
                    response.status(500).json(err);
                });
            })
        }
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.delete('/user/:tag', authenticate, (request, response) => {

    console.log(`User ${request.userId} unfollowing tag '${request.params.tag}'`);
    db.Tag.findOne({
        where: {
            name: request.params.tag
        }
    }).then( (result) => {

        db.sequelize.models.following.destroy({
            where: {
                TagId: result.dataValues.id,
                UserId: request.userId
            }
        }).then( (deleteResult) => {
            console.log('Unfollow successful!');
            response.json(deleteResult);
        }).catch( (err) => {
            response.status(500).json(err);
        });
        
    }).catch( (err) => {
        response.status(500).json(err);
    })
})

router.put('/service', authenticate, (request, response) => {
    db.Tag.findAll({
        where: {
            name: { [Op.in]: request.body.tags }
        }
    }).then((result) => {
        const insertArr = result.map((r) => {
            return { ServiceId: request.body.service, TagId: r.dataValues.id };
        });
        console.log(`insertArr: `, insertArr);
        db.sequelize.models.service_tags.bulkCreate(insertArr)
            .then((linkResult) => {
                response.json(linkResult);
            }).catch((err) => {
                console.log(err);
                response.status(500).json(err);
            });
    }).catch((err) => {
        console.log(err);
        response.status(500).json(err);
    });
});

router.put('/question', authenticate, (request, response) => {
    db.Tag.findAll({
        where: {
            name: { [Op.in]: request.body.tags }
        }
    }).then((result) => {
        const insertArr = result.map((r) => {
            return { QuestionId: request.body.question, TagId: r.dataValues.id };
        });

        console.log(insertArr);

        db.sequelize.models.question_tags.bulkCreate(insertArr)
            .then((linkResult) => {
                response.json(linkResult);
            }).catch((err) => {
                response.status(500).json(err);
            });
    }).catch((err) => {
        response.status(500).json(err);
    });
});

module.exports = router;