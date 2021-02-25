const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');
const { Sequelize } = require('../models');
const { authenticate } = require('../helpers/helpers');

router.get('/', (request, response) => {

    // Use this route to check if a user has already rated a specified entity
    if (request.query.user) {
        db.Rating.findOne({
            where: {
                UserId: request.query.user,
                type: request.query.type,
                ref: request.query.ref
            }
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }

    db.Rating.count({
        where: {
            type: request.query.type,
            ref: request.query.ref,
            isPositive: true
        }
    }).then( (countPositive) => {
        db.Rating.count({
            where: {
                type: request.query.type,
                ref: request.query.ref,
                isPositive: false
            }
        }).then( (countNegative) => {
            response.json({
                positive: countPositive,
                negative: countNegative
            });
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }).catch( (err) => {
        response.status(500).json(err);
    }); 

});


router.put('/', authenticate, (request, response) => {
    db.Rating.update({isPositive: Sequelize.literal('NOT isPositive')}, { // The sequelize literal may not work for this use-case
        where: {
            id: request.body.id
        }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', authenticate, (request, response) => {
    db.Rating.create({
        UserId: request.body.userId,
        isPositive: request.body.isPositive,
        type: request.body.type,
        ref: request.body.ref
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.delete('/:id', authenticate, (request, response) => {
    db.Rating.destroy({
        where: { id: request.params.id }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});