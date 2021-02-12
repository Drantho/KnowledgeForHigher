const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../models");
const axios = require('axios')

require('dotenv').config()

function ensureAuthenticated(req, res, next) {

    if (req.session.user) {
        return next();
    }
    else {
        res.redirect("/signin")
    }

}

module.exports = {ensureAuthenticated: ensureAuthenticated}