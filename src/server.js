const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io')

const app = express()
const httpServer = createServer(app);

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
    console.log('connected successfully', socket)
});

httpServer.listen(3001);
