const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../utils/authenticate");
const profanityCheck = require ("../utils/profanityFilter")
const { Op } = require('sequelize');
const { Sequelize } = require('../models');

require('dotenv').config();

router.get('/', (request, response) => {
    if (request.query.id) {
        db.User.findOne({
            where: { id: request.query.id }
        }).then((result) => {
            return response.json(result);
        }).catch((err) => {
            return response.status(500).json(err);
        });
    }

    if (request.query.search) {
        db.User.findAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: '%' + request.query.search + '%' } },
                    { firstName: { [Op.like]: '%' + request.query.search + '%' } },
                    { lastName: { [Op.like]: '%' + request.query.search + '%' } }
                ]
            }
        }).then((result) => {
            response.json(result);
        }).catch((err) => {
            response.status(500).json(err);
        });
    }
});

router.post('/', ({ body }, response) => {

    if (profanityCheck(body.firstName + ' ' + body.lastName + ' ' + body.username)) {
        response.status(400).json({
            err: 'User contains disallowed term/phrase.'
        });
        return;
    }

    db.User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.username,
        email: body.email,
        password: body.password
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

router.put('/',authenticate, ({ body }, response) => {

    if (profanityCheck(body.firstName + ' ' + body.lastName + ' ' + body.username)) {
        response.status(400).json({
            err: 'User contains disallowed term/phrase.'
        });
        return;
    }

    db.User.update({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password
    }, {
        where: { id: body.userId }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

router.delete('/:id', authenticate,  (request, response) => {
    db.User.update({
        status: Sequelize.literal('NOT status')
    }, {
        where: { id: request.userId }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// ===================================================

router.post("/signup", (req, res) => {
    if (profanityCheck(req.body.firstName + ' ' + req.body.lastName + ' ' + req.body.username)) {
        response.status(400).json({
            err: 'User contains disallowed term/phrase.'
        });
        return;
    }

    db.User.create(req.body).then(user => {
        const token = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            isProfessional: user.isProfessional,
            id: user.id
        }, process.env.JWT_SECRET);
        console.log(token);
        res.json({ token, user })
    })
});

router.post("/signin", (req, res) => {
    db.User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    isProfessional: user.isProfessional,
                    id: user.id
                }, process.env.JWT_SECRET)
                res.json({ token, user })
            } else {
                res.status(403).json({ msg: 'user/password incorrect' })
            }
        } else {
            res.status(403).json({ msg: 'user/password incorrect' })
        }
    })
});

router.get("/secret", (req, res) => {
    let token = false;
    if (!req.headers) {
        token = false;
    } else if (!req.headers.authorization) {
        token = false;
    } else {
        token = req.headers.authorization.split(" ")[1]
        console.log(token);
    }

    if (token) {
        const data = jwt.verify(token, "SECRETSTRINGGOESHERE!", (err, data) => {
            if (err)
                return false;

            return data;
        });

        if (data) {
            res.json({ msg: 'auth' })
        } else {
            res.status(403).json({ msg: "you are not authorized to view this page" })
        }
    } else {
        res.status(403).json({ msg: "you are not authorized to view this page" })
    }
});

router.get("/authenticate", (req, res) => {
    console.log(`authenticate route reached`);
    console.log(req.headers.authorization);
    
    const token = req.headers.authorization.split(" ")[1];

    data = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(403).json({msg: "you are not authorized to view this page."});
        } else {
            console.log(`user data: `, data);
            res.json({user: data, token: token});
        }
    })

});

module.exports = router;