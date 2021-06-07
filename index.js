const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use("/public", express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) =>{
    var clientIp = socket.request.socket.remoteAddress;

    console.log(clientIp);

    io.emit('connection user', clientIp);
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
})