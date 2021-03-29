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
            attributes: ['id', 'userName', 'firstName', 'lastName', 'portrait']
        }, {
            model: db.User,
            as: 'user1',
                where: { id: { [Op.ne]: request.userId } },
            required: false,
            attributes: ['id', 'userName', 'firstName', 'lastName', 'portrait']
        }],
        order: [['updatedAt', 'DESC']] // Will order threads by most recently messaged
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', authenticate, async (request, response) => {

    const user2 = await db.User.findOne({
        where: { userName: request.body.user2 }
    });

    db.Thread.findOne({ // Check if thread already exists b/w users
        where: {
            [Op.and]: [
                {[ Op.or ]: [
                    { user1Id: request.userId },
                    { user2Id: request.userId }
                ]},
                {[ Op.or ]: [
                    { user1Id: user2.id },
                    { user2Id: user2.id }
                ]}
            ]
        }
    }).then( (result) => {
        if (result) {
            response.json({
                thread: result.dataValues,
                user: user2,
                isNewRecord: false
            });
        } else { // If thread doesn't exist, create it
            console.log(`Creating thread b/w user ${request.userId} and user ${user2.id}`)
            db.Thread.create({
                user1Id: request.userId,
                user2Id: user2.id
            }).then( (result) => {
                response.json({ thread: result, user: user2, isNewRecord: true });
            }).catch( (err) => {
                response.status(500).json(err);
            });
        }
    }).catch( (err) => {
        response.status(500).json(err);
    });

});

module.exports = router;
