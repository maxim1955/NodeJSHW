const sequelize = require('../DB')
const Chat = require('../models/Chat')
const Room = require('../models/Room')

Room.hasOne(Chat)
Chat.belongsTo(Room)

const init = async () => {
    await sequelize.sync({
        alter: false,
        force: false,
    })
}
module.exports = {init, Chat, Room}
