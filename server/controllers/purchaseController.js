const express = require('express');
const router = express.Router();
const db = require('../models');
const {authenticate} = require("../helpers/helpers");

const { Op } = require('sequelize');

router.get('/', (request, response) => {

});

router.post('/', authenticate, (request, response) => {

});

router.put('/', authenticate, (request, response) => {

});

router.delete('/', authenticate, (request, response) => {

});