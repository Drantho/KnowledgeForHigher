const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

router.get('/', (request, response) => {
    // Get all messages in a thread
    db.Message.findAll({
        include: {
            model: db.Thread,
            where: {
                id: request.query.thread
            },
            attributes: []
        },
        order: [ ['createdAt', 'DESC'] ]
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', (request, response) => {
    db.Message.create({
        senderId: request.body.senderId,
        recipientId: request.body.recipientId,
        ThreadId: request.body.thread,
        body: request.body.body
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;