const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../models");
const axios = require('axios')
const router = express.Router();

require('dotenv').config()
const {ensureAuthenticated} = require("./helpers")

router.get("/", (req, res) => {
    res.json({msg: "This is the home page"})
})

module.exports = router;
