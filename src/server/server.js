const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io')

const app = express()
const httpServer = createServer(app);

let roomId

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log(`Example app listening on port`)
})

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on('roomId', (data) => {
        roomId = data.room
        socket.leave(socket.id)
        socket.join("room:" + roomId);
        console.log(socket.rooms)
    })

    socket.on('msg', (args) => {
        io.to('room:' + roomId).emit('roomChat', args)
    })
    socket.broadcast.emit("hello", 'В чате новый пользователь');
});


httpServer.listen(3001);
