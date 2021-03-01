const express = require("express");
const cors = require("cors");
const compression = require("compression");
require('dotenv').config();

const db = require("./models");
const app = express();

app.use(compression());
app.use(cors())
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const routes = require("./controllers/routes.js");

app.use(routes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../client/build"))
}

const PORT = process.env.PORT || 3001;
db.sequelize.sync({ force: false}).then(function () {
    app.listen(PORT, function () {
        console.log(`App now listening on port: ${PORT} view at: http://localhost:${PORT}`);
    });
});