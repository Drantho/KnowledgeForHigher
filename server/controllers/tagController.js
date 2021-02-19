const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');

router.get('/', (request, response) => {

    // Get individual tag by ID or by NAME
    if (request.query.id || request.query.name) {
        const condition = {};
        if (request.query.id) { where.id = request.query.id; }
        else { where.name = request.query.name; }

        db.Tag.findOne({
            where: condition
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    // If a user ID is provided, get all tags that said user is following
    if (request.query.user) {
        db.Tag.findAll({
            include: {
                model: db.User,
                where: { id: request.query.user },
                attributes: [],
                through: { attributes: [] }
            }
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    // If a question ID is provided get all tags linked to said question
    if (request.query.question) {
        db.Tag.findAll({
            include: {
                model: db.Question,
                where: { id: request.query.question },
                attributes: [],
                through: { attributes: [] }
            }
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    // If a service ID is provided get all tags linked to said service
    if (request.query.service) {
        db.Tag.findAll({
            include: {
                model: db.Service,
                where: { id: request.query.service },
                attributes: [],
                through: { attributes: [] }
            }
        }).then( (result) => {
            response.json(result);
            return;
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
    }

    if (request.query.search) {
        db.Tag.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: '%' + request.query.search + '%' } },
                    { description: { [Op.like]: '%' + request.query.search + '%' } }
                ]
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }

});

router.post('/', (request, response) => {
    db.Tag.create({
        name: request.body.name,
        description: request.body.description
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});