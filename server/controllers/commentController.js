const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");
const profanityCheck = require('../utils/profanityFilter');

const { Op } = require('sequelize');

router.get('/', (request, response) => {
    // Get individual answer by ID
    if (request.query.id) {
        db.Comment.findOne({
            where: { id: request.query.id }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }

    // Get all comments attached to a specified question
    if (request.query.question) {
        db.Comment.findAll({
            include: [{
                model: db.Question,
                where: { id: request.query.question },
                attributes: []
            },{
                model: db.User
            }]
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            console.log(err);
            response.status(500).json(err);
        });
    }

    // Get all comments attached to a specified answer
    if (request.query.answer) {
        db.Comment.findAll({
            include: {
                model: db.Answer,
                where: { id: request.query.answer },
                attributes: []
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }
    
    // Get all comments submitted by a specified user
    if (request.query.user) {
        db.Comment.findAll({
            include: {
                model: db.User,
                where: { id: request.query.user },
                attributes: []
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });  
    }    

    // Get all comments attached to a specified service
    if (request.query.service) {
        db.Comment.findAll({
            include: {
                model: db.User
            },
            where:[
                {ServiceId: request.query.service}
            ]
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            console.log(err);
            response.status(500).json(err);
        });  
    }
});

router.put('/', authenticate, (request, response) => {
    if (profanityCheck(request.body.text)) {
        response.status(400).json({
            err: 'Comment body contains disallowed term/phrase.'
        });
        return;
    }
    
    db.Comment.update({
        text: request.body.text
    }, {
        where: [{ id: request.body.id },
        {UserId: request.userId}]
    }).then( (result) => {  
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', authenticate, (request, response) => {

    if (profanityCheck(request.body.text)) {
        response.status(400).json({
            err: 'Comment body contains disallowed term/phrase'
        });
        return;
    }
    
    const createParams = {
        text: request.body.text,
        UserId: request.userId,
        type: request.body.type
    };

    switch (request.body.type) {
        case 'answer':
            createParams.AnswerId = request.body.ref;
            break;
        case 'question':
            createParams.QuestionId = request.body.ref;
            break;
        case 'service':
            createParams.ServiceId = request.body.ref;
            break;
        default:
            break;
    }

    db.Comment.create( createParams ).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        console.log(err);
        response.status(500).json(err);
    });
});

// Delete an individual comment by ID (will also delete any attached ratings)
router.delete('/:id', authenticate, (request, response) => {
    db.Comment.destroy({
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