require('dotenv').config({})

let roomId
const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io')
const ChatService = require('../server/services/ChataService')

const chatService = new ChatService()

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:8080"],
        credentials: true,
    }
});

app.listen(3000, () => {
    console.log(`Example app listening on port`)
})

io.on("connection", async (socket) => {
    try {
        const history = await chatService.getMessage();
        const room = await chatService.getRooms();
        socket.emit('get-rooms', room)
        socket.emit('history', history)
    } catch (err) {
        throw err
    }
    socket.on('defRoom', async (room_id) => {
        console.log(room_id)
        await chatService.getMessage(room_id);
        const history = await chatService.getMessage(room_id);
        socket.emit('history', history);

    })
    socket.on('create_room', async (data) => {
        try {
            const room = await chatService.CreateRoom(data)
            socket.emit('rooms-list-changed', room)
            socket.broadcast.emit('rooms-list-changed', room)
        } catch (err) {
            console.log(err)
        }
    })

    socket.on('join_room', async (data) => {
        // Получить историю комнаты
        try {
            const history = await chatService.getMessage(data.room_id);
            socket.join('room' + data.room_id);
            socket.emit('history', history);
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('leave_room', data => {
        try {
            if (data.room_id) {
                console.log('true')
                socket.leave('room' + data.room_id);
            }
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('msg', async (args) => {
        try {
            await chatService.saveMessages(args)
            if (!args.room_id === null) {
                io.to('room' + roomId).emit('message', args)
            } else {
                socket.emit('message', args)
                socket.broadcast.emit('message', args)
            }
        } catch (err) {
            console.error(err)
        }
    })
});

httpServer.listen(3001);


