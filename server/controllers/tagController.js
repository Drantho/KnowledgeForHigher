const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');

router.get('/', (request, response) => {

    // Get individual tag by ID or by NAME
    if (request.query.id || request.query.name) {
        
        db.Tag.findOne({
            where: { id: (request.query.id || request.query.name) }
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    if (request.query.user) {
        db.Tag.findAll({
            include: {
                model: db.User,
                where: {
                    id: request.query.user
                },
                attributes: [],
                through: { attributes: [] }
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }

    // Get all tags that a user is following

    //
});

