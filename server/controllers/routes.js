const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../models");
const axios = require('axios')
const router = express.Router();
const questionRoutes = require("./questionController");
const tagRoutes = require("./tagController");
const serviceRoutes = require("./serviceController");
const userRoutes = require("./userController");


require('dotenv').config()

router.use("/api/question", questionRoutes);
router.use("/api/tag", tagRoutes);
router.use("/api/service", serviceRoutes);
router.use("/api/user", userRoutes);


router.get("/", (req, res) => {
    res.json({msg: "This is the home page"})
});


module.exports = router;
