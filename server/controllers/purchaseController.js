const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

const { Op } = require('sequelize');

router.get('/', (request, response) => {
    db.Purchase.findAll({
        include: [{
            model: db.User,
            where: { id: request.query.user }
        }, {
            model: db.Service,
            include: {
                model: db.User,
                where: { id: request.query.user }
            }
        }],
        order: ['createdAt', 'DESC']
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', authenticate, (request, response) => {
    db.Purchase.create({
        UserId: request.body.user,
        ServiceId: request.body.service
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.delete('/', authenticate, (request, response) => {

});