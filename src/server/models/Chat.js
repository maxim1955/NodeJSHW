const sequelize = require("../DB")
const {DataTypes} = require('sequelize')

const chat = sequelize.define('message', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'USER'
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

}, {
    tableName: 'message',
    timestamps: true,
    underscored: true,
})
module.exports = chat
