const sequelize = require("../DB")
const {DataTypes} = require('sequelize')

const Room = sequelize.define('room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'Room'
    },

}, {
    tableName: 'room',
    timestamps: true,
    underscored: true
})
module.exports = Room
