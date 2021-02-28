const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticate = require("../utils/authenticate");

const { Op } = require('sequelize');

router.get('/', authenticate, (request, response) => {
    db.Thread.findAll({
        where: {
            [ Op.or ]: [
                { user1Id: request.userId },
                { user2Id: request.userId }
            ]
        },
        include: [{
            model: db.User,
            as: 'user2',
            where: { id: { [Op.ne]: request.userId } },
            required: false,
            attributes: ['id', 'userName', 'firstName', 'lastName']
        }, {
            model: db.User,
            as: 'user1',
                where: { id: { [Op.ne]: request.userId } },
            required: false,
            attributes: ['id', 'userName', 'firstName', 'lastName']
        }],
        order: [['updatedAt', 'DESC']] // Will order threads by most recently messaged
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', (request, response) => {

    db.Thread.findOne({ // Check if thread already exists b/w users
        where: {
            [Op.and]: [
                {[ Op.or ]: [
                    { user1Id: request.body.user1 },
                    { user2Id: request.body.user1 }
                ]},
                {[ Op.or ]: [
                    { user1Id: request.body.user2 },
                    { user2Id: request.body.user2 }
                ]}
            ]
        }
    }).then( (result) => {
        if (result) {
            response.json(result);
        } else { // If thread doesn't exist, create it
            db.Thread.create({
                user1Id: request.body.user1,
                user2Id: request.body.user2
            }).then( (result) => {
                response.json(result);
            }).catch( (err) => {
                response.status(500).json(err);
            });
        }
    }).catch( (err) => {
        response.status(500).json(err);
    });

});

module.exports = router;
