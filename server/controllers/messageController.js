const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

router.get('/', authenticate, (request, response) => {
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
        result.forEach( (e) => {
            const newDate = new Date(Date.parse(e.createdAt));
            let minute = newDate.getMinutes();
            if (minute < 10) {
                minute = '0' + minute;
            } 

            e.dataValues.formattedDate 
                = `${newDate.getMonth()+1}-${newDate.getDate()} at ${newDate.getHours()}:${minute}`
        });
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', authenticate, (request, response) => {
    db.Message.create({
        senderId: request.userId,
        recipientId: request.body.recipientId,
        ThreadId: request.body.ThreadId,
        body: request.body.body
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;