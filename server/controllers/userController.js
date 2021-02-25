const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');
const { Sequelize } = require('../models');

router.get('/', (request, response) => {
    if (request.query.id) {
        db.User.findOne({
            where: { id: request.query.id }
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }

    if (request.query.search) {
        db.User.findAll({
            where: {
                [Op.or]: [
                    { username:  { [Op.like]: '%' + request.query.search + '%'}},
                    { firstName: { [Op.like]: '%' + request.query.search + '%'}},
                    { lastName:  { [Op.like]: '%' + request.query.search + '%'}}
                ]
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }
});

router.post('/', ({ body }, response) => {

    // TODO: authentication, password hashing
    // TODO: run username through profanity filter

    db.User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.username,
        email: body.email,
        password: body.password
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.put('/', ({body}, response) => {

    // TODO: authentication, password hashing
    // TODO: run username through profanity filter
    
    db.User.update({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password
    }, { 
        where: { id: body.user }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.delete('/:id', ({ params }, response) => {
    db.User.update({
        status: Sequelize.literal('NOT status')
    }, {
        where: { id: params.id }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;