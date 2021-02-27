const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

const { Op } = require('sequelize');

router.get('/', (request, response) => {
    // Get all messages b/w two users
    db.Message.findAll({
        where: {
            [ Op.or ] : [
                { senderId: request.query.sender },
                { senderId: request.query.recipient }
            ],
            [ Op.or ] : [
                { recipientId: request.query.recipient },
                { recipientId: request.query.sender }
            ]
        }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).jason(err);
    });
});

router.post('/', (request, response) => {
    db.Message.create({
        senderId: request.body.sender,
        recipientId: request.body.recipient,
        body: request.body.body
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;