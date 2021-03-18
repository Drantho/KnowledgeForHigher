const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

const { Op } = require('sequelize');
const { Sequelize } = require('../models');


router.get('/', (request, response) => {

    // Use this route to check if a user has already rated a specified entity
    if (request.query.user) {
        db.Rating.findOne({
            where: {
                UserId: request.query.user,
                type: request.query.type,
                ref: request.query.ref
            }
        }).then((result) => {
            return response.json(result);
        }).catch((err) => {
            return response.status(500).json(err);
        });
    }

    db.Rating.count({
        where: {
            type: request.query.type,
            QuestionId: request.query.type === "question" ? request.query.ref : null,
            ServiceId: request.query.type === "service" ? request.query.ref : null,
            AnswerId: request.query.type === "answer" ? request.query.ref : null,
            isPositive: true
        }
    }).then((countPositive) => {
        db.Rating.count({
            where: {
                type: request.query.type,
                QuestionId: request.query.type === "question" ? request.query.ref : null,
                ServiceId: request.query.type === "service" ? request.query.ref : null,
                AnswerId: request.query.type === "answer" ? request.query.ref : null,
                isPositive: false
            }
        }).then((countNegative) => {
            response.json({
                positive: countPositive,
                negative: countNegative
            });
        }).catch((err) => {
            response.status(500).json(err);
        });
    }).catch((err) => {
        response.status(500).json(err);
    });

});

router.get('/all', (request, response) => {
    db.Rating.findAll( {
        where: { UserId: request.query.user }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
})


router.put('/', authenticate, (request, response) => {
    db.Rating.update({ isPositive: Sequelize.literal('NOT isPositive') }, { // The sequelize literal may not work for this use-case
        where: {
            id: request.body.id
        }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

router.post('/', authenticate, (request, response) => {

    db.Rating.findOne({
        where: {
            UserId: request.userId,
            type: request.body.type,
            QuestionId: request.body.type === "question" ? request.body.ref : null,
            AnswerId: request.body.type === "answer" ? request.body.ref : null,
            ServiceId: request.body.type === "service" ? request.body.ref : null,
        }
    }).then((result) => {
        if (result) {
            response.status(405).json({ msg: "You have already rated this resource." })
        } else {
            db.Rating.create({
                UserId: request.userId,
                isPositive: request.body.isPositive,
                type: request.body.type,
                QuestionId: request.body.type === "question" ? request.body.ref : null,
                AnswerId: request.body.type === "answer" ? request.body.ref : null,
                ServiceId: request.body.type === "service" ? request.body.ref : null,

            }).then((result) => {
                response.json(result);
            }).catch((err) => {
                console.log(err);
                response.status(500).json(err);
            });
        }
    }).catch((err) => {
        console.log(err);
        return response.status(500).json(err);
    });

});

router.delete('/:id', authenticate, (request, response) => {
    db.Rating.destroy({
        where: { id: request.params.id }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

module.exports = router;