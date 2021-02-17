const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../models");
const axios = require('axios')

require('dotenv').config()

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
    
        return next();
        
    res.redirect('/signin');

}

module.exports = {isLoggedIn: isLoggedIn}