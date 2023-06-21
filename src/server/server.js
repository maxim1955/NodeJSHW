const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io')

const app = express()
const httpServer = createServer(app);

let roomId

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log(`Example app listening on port`)
})

io.on("connection", (socket) => {
    socket.on('roomId', (data) => {
        roomId = data.room
        socket.leave('room:' + roomId)
        socket.join("room:" + roomId);
    })

    socket.on('msg', (args) => {
        io.to('room:' + roomId).emit('roomChat', args)
        console.log(roomId)
    })
    socket.broadcast.emit("hello", 'User is connected');
});


httpServer.listen(3001);
