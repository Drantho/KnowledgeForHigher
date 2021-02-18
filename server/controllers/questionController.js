const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

router.get('/', (request, response) => {

    if (request.query.id) {
        db.Question.findOne({
            where: { id: request.query.id }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }
});