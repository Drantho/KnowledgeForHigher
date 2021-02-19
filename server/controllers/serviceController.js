const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');

router.get('/', (request, response) => {
    // find an individual service
    if (request.query.id) {
        db.Service.findOne({
            where: { id: request.query.id }
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    const includes = [];
    if (request.query.user) {
        includes.push({
            model: db.User,
            where: { id: request.query.user },
            attributes: [],
            through: { attributes: [] }
        });
    }

    if (request.query.tag) {
        includes.push({
            model: db.Tag,
            where: { name: request.query.tag },
            attributes: [],
            through: { attributes: [] }
        });
    }

    db.Service.findAll({
        include: includes
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.post('/', (request, response) => {

});

router.delete('/:id', (request, response) => {

});

module.exports = router;