const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

const { Op } = require('sequelize');

router.get('/', (request, response) => {

    // Get individual tag by ID or by NAME
    if (request.query.id || request.query.name) {
        const condition = {};
        if (request.query.id) { condition.id = request.query.id; }
        else { where.name = request.query.name; }

        db.Tag.findOne({
            where: condition,
            include: [{
                model: db.Question,
                through: { attributes: [] }
            },
            {
                model: db.Service,
                through: { attributes: [] },
                where: {
                    active: true
                },
                required: false,
                include: [{
                    model: db.User,
                    attributes: ['userName', 'id']
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
        db.Tag.findAll({
            include: {
                model: db.User,
                where: { id: request.query.user },
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
            response.status(500).json(err);
        });
    }

});

router.post('/', authenticate, (request, response) => {
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

// router.put('/name', (request, response) => {
//     db.Tag.update({
//         name: request.body.name
//     }, {
//         where: { id: request.body.id }
//     }).then((result) => {
//         response.json(result);
//     }).catch((err) => {
//         response.status(500).json(err);
//     });
// });

router.put('/description', (request, response) => {
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

router.put('/user', authenticate, (request, response) => {
    db.Tag.findAll({
        where: {
            name: { [Op.in]: request.body.tags }
        }
    }).then((result) => {
        const insertArr = result.map((r) => {
            return { UserId: request.userId, TagId: r.dataValues.id };
        });
        db.sequelize.models.following.bulkCreate(insertArr)
            .then((linkResult) => {
                response.json(linkResult);
            }).catch((err) => {
                response.status(500).json(err);
            });
    }).catch((err) => {
        response.status(500).json(err);
    });
});

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