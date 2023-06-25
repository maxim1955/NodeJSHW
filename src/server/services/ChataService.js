const {Chat, Room} = require('../models/Init')

class ChatService {
    async getRooms() {
        try {
            return await Room.findAll({})
        } catch (err) {
            throw err
        }
    }

    async CreateRoom(name) {
        try {
            const rooms = await Room.create(name)
            return rooms
        } catch (e) {
            throw e
        }
    }

    async getMessage(room_id = null) {
        try {
            const filter = {}
            if (room_id) {
                filter.room_id = room_id
            } else {
                filter.room_id = null
            }
            const messages = Chat.findAll({
                where: filter,
                order: [['created_at', 'desc']]
            })
            return messages
        } catch (err) {
            throw err
        }
    }

    async saveMessages(data) {
        try {
            const message = await Chat.create(data)
            return message
        } catch (err) {
            throw err
        }
    }
}

module.exports = ChatService;
