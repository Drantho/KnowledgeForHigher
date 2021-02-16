const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../models");
const axios = require('axios')
const router = express.Router();

require('dotenv').config()
const {ensureAuthenticated} = require("./helpers")

router.get("/", (req, res) => {
    res.json({msg: "This is the home page"})
});

router.get("/signup", (req, res) => {
    res.json({msg: "signup page"})
});

router.get("/signin", (req, res) => {
    res.json({msg: "signin page"})
});

module.exports = router;
