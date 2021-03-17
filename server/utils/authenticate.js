const jwt = require("jsonwebtoken");
require('dotenv').config()

const authenticate = (req, res, next) => {
    let token = false;

    if (!req.headers) {
        token = false
    }
    else if (!req.headers.authorization) {
        token = false;
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        data = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ msg: "you are not authorized to view this page." });
            } else {
                req.userId = data.id;
                return next();
            }
        })
    }
    else {
        return res.status(403).json({ msg: "you are not authorized to view this page." });
    }    
}

module.exports = authenticate;