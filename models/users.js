const sequalize = require('DB')
const {DataTypes} = require('sequelize')
const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    organization_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'pair',
    timestamps: false

});
module.exports = User;
