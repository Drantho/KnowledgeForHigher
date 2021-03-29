const express = require("express");
const cors = require("cors");
const compression = require("compression");
const socketio = require('socket.io');
const http = require('http');
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

// Set up server for socket io
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('New connection!!!');

    socket.on('join', async thread => {
        console.log('Thread ID passed to socket: ' + thread);
        socket.join(thread);
        io.emit('roomJoined', thread);
    });

    socket.on('typing', (data) => {
        io.emit('typing-' + data.thread + '-' + data.sender);
    });

    socket.on('message', async (data) => {
        const message = await db.Message.create({
            senderId: data.senderId,
            recipientId: data.recipientId,
            ThreadId: data.ThreadId,
            body: data.body
        });
        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected!!!');
    });
});

const PORT = process.env.PORT || 3001;
db.sequelize.sync({ force: false}).then(function () {
    server.listen(PORT, function () {
        console.log(`App now listening on port: ${PORT} view at: http://localhost:${PORT}`);
    });
});