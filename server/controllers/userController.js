const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Op } = require('sequelize');
const { Sequelize } = require('../models');

router.get('/', (request, response) => {
    if (request.query.id) {
        db.User.findOne({
            where: { id: request.query.id }
        }).then( (result) => {
            return response.json(result);
        }).catch( (err) => {
            return response.status(500).json(err);
        });
    }

    if (request.query.search) {
        db.User.findAll({
            where: {
                [Op.or]: [
                    { username:  { [Op.like]: '%' + request.query.search + '%'}},
                    { firstName: { [Op.like]: '%' + request.query.search + '%'}},
                    { lastName:  { [Op.like]: '%' + request.query.search + '%'}}
                ]
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
    }
});

router.post('/', ({ body }, response) => {

    // TODO: authentication, password hashing
    // TODO: run username through profanity filter

    db.User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        email: body.email,
        password: body.password
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.put('/', ({body}, response) => {

    // TODO: authentication, password hashing
    // TODO: run username through profanity filter
    
    db.User.update({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password
    }, { 
        where: { id: body.user }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

router.delete('/:id', ({ params }, response) => {
    db.User.update({
        status: Sequelize.literal('NOT status')
    }, {
        where: { id: params.id }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// ===================================================

router.post("/signup", (req, res) => {
    db.User.create(req.body).then(user => {
        res.json(user);
    })
});

router.post("/signin", (req, res) => {
    db.User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.userName,
                    isProfessional: user.isProfessional,
                    id: user.id
                }, "SECRETSTRINGGOESHERE!")
                res.json({token, user})
            }else{
                res.status(403).json({msg: 'user/password incorrect'})    
            }
        }else{
            res.status(403).json({msg: 'user/password incorrect'})
        }
    })    
});

router.get("/secret", (req, res) => {
    let token = false;
    if(!req.headers){
        token = false;
    }else if(!req.headers.authorization){
        token = false;
    }else{
        token = req.headers.authorization.split(" ")[1]
        console.log(token);
    }

    if(token){
        const data = jwt.verify(token, "SECRETSTRINGGOESHERE!", (err, data) => {
            if(err)
                return false;

            return data;
        });

        if(data){
            res.json({msg: 'auth'})
        }else{
            res.status(403).json({msg: "you are not authorized to view this page"})    
        }
    }else{
        res.status(403).json({msg: "you are not authorized to view this page"})
    }
})


module.exports = router;