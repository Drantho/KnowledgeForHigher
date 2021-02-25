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
const {ensureAuthenticated} = require("./helpers");
const passport = require("passport");

router.use("/api/question", questionRoutes);
router.use("/api/tag", tagRoutes);
router.use("/api/service", serviceRoutes);
router.use("/api/user", userRoutes);


router.get("/", (req, res) => {
    res.json({msg: "This is the home page"})
});

router.post("/signup", passport.authenticate('local-signup',{
    successRedirect: "/success",
    failureRedirect: "/fail"
}));

router.get("/success", (req, res) => {
    res.json({msg: "signed up"});
})

router.get("/fail", (req, res) => {
    res.json({msg: "failed"});
})

router.get("/signin", (req, res) => {
    res.json({msg: "signin page"})
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/success',

    failureRedirect: '/fail'
}

));

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {

        res.redirect('/');

    });
});


module.exports = router;
