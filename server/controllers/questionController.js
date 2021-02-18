const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

router.get('/', (request, response) => {

    if (request.query.id) {
        db.Question.findOne({
            where: {
                id: request.query.id
            },
            attributes: ['id', 'title', 'text', 'updatedAt']
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    db.Question.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 30
    });
});

router.post('/', (request, response) => {
    db.Question.create({
        UserId: request.body.id, // replace with authenticated user
        title: request.body.title,
        text: request.body.text
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    })
})


module.exports = router;