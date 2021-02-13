const express = require("express");
const session = require("express-session");
const cors = require("cors");
const compression = require("compression");
const db = require("./models");
require('dotenv').config()

const app = express();

app.use(compression());
app.use(cors())
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));


app.use(session({
    secret: process.env.USER_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}))

const routes = require("./controllers/routes.js");


app.use(routes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../client/build"))
}

const PORT = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log(`App now listening on port: ${PORT} view at: http://localhost:${PORT}`);
    });
});