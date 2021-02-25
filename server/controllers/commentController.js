const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

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
            include: {
                model: db.Question,
                where: { id: request.query.question },
                attributes: []
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
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
});

router.put('/', authenticate, (request, response) => {
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

    // TODO: check for profanity
    
    const createParams = {
        text: request.body.text,
        UserId: request.userId,
        type: request.body.type
    };

    switch (request.body.type) {
        case 'answer':
            createParams.AnswerId = request.body.answer;
            break;
        case 'question':
            createParams.QuestionId = request.body.question;
            break;
        case 'answer':
            createParams.ServiceId = request.body.service;
            break;
        default:
            break;
    }

    db.Comment.create( createParams ).then( (result) => {
        response.json(result);
    }).catch( (err) => {
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