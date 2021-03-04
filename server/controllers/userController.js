const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../utils/authenticate");
const profanityCheck = require('../utils/profanityFilter');
const cloudinary = require("cloudinary");

const { Op } = require('sequelize');
const { Sequelize } = require('../models');

require('dotenv').config();

router.get('/', (request, response) => {
    if (request.query.id) {
        db.User.findOne({
            where: { id: request.query.id }
        }).then((result) => {
            console.log(`findUserById: `, result);
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
        password: body.password,
        bio: body.bio
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

router.put('/', authenticate, (request, response) => {

    if (profanityCheck(request.body.firstName + ' ' + request.body.lastName + ' ' + request.body.username + ' ' + request.body.bio)) {
        response.status(400).json({
            err: 'User contains disallowed term/phrase.'
        });
        return;
    }

    db.User.update(request.body, {
        where: { id: request.userId }
    }).then((result) => {
        response.json(result);
    }).catch((err) => {
        console.log(err);
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

router.post("/signup", async (req, res) => {
    if (profanityCheck(req.body.username)) {
        res.statusMessage = 'Username contains disallowed term/phrase.';
        res.status(400).end();
        return;
    }

    const checkUsername = await db.User.findOne({ where: { userName: req.body.userName } });
    if (checkUsername) {
        res.statusMessage = 'Username already in use.';
        res.status(400).end();
        return;
    }

    const checkEmail = await db.User.findOne({ where: { email: req.body.email } });
    if (checkEmail) {
        res.statusMessage ='Email already in use.';
        res.status(400).end();
        return;
    }

    db.User.create(req.body).then(user => {
        const token = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,            
            isProfessional: user.isProfessional,
            portrait: user.portrait,
            bio: user.bio,
            id: user.id
        }, process.env.JWT_SECRET);
        console.log(token);
        res.json({ token, user })
    }).catch( (err) => {
        res.status(400).json(err);
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
                    portrait: user.portrait,
                    bio: user.bio,
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

router.post("/portrait", authenticate, async (request, response) => {
    try {
        console.log(`upload photo endpoint reached`);

        const file = request.body.data;

        cloudinary.config({
            cloud_name: "drantho",
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        const {portrait} = await db.User.findOne({
            where: {
                id: request.userId
            },
            attributes: ["portrait"]
        });

        cloudinary.uploader.destroy(portrait, function(result) { console.log(result) });

        const uploadedResponse = await cloudinary.uploader.upload(file);

        db.User.update({portrait: uploadedResponse.public_id}, {where:{id: request.userId}}).then(data => {
            response.json({id: uploadedResponse.public_id})
        }).catch(err => {
            console.log(err);
            response.status(500).json(err);
        });

    } catch (err) {
        console.log(err);
        return response.status(500).json(err)
    }
})

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