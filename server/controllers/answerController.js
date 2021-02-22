const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');

router.get('/', (request, response) => {
    // Find an individual answer
    if (request.query.id) {
        db.Answer.findOne({
            where: { id: request.query.id }
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }

    // Get all of a question's answers
    if (request.query.question) {
        db.Answer.findAll({
            include: {
                model: db.Question,
                where: { id: request.query.question },
                attributes: []
            }
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }

    // Find all of a user's answers
    if (request.query.user) {
        db.Answer.findAll({
            include: {
                model: db.User,
                where: { id: request.query.user },
                attributes: []
            }
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }
});

// Create an answer
router.post('/', (request, response) => {

    // TODO: Validate user

    // TODO: Validate profanity

    db.Answer.create({
        text: request.body.text,
        UserId: request.body.user,
        QuestionId: request.body.question
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Delete an individual Answer (will also delete any of its comments and ratings)
router.delete('/:id', (request, response) => {
    db.Answer.destroy({
        where: { id: request.params.id }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});