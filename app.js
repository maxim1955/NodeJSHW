/*
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vr'
});

connection.execute('SELECT * FROM users WHERE id = ?',
    [11], (err, result, fields) => {
        console.log(result)
    }
);
const user = {
    first_name: 'Maxon',
    organization_name: '1t',
    email: 'maxim@mail.com',
    password: 'SA23dcSST',
    number: 89545878
}
connection.query('INSERT INTO pair SET ?', user,
    (error, results, fields) => {
        if (error) throw error;
        console.log(results.insertId);
    });
*/
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('vr', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

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

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true


;(async () => {
    try {
        await User.sync({
            alter: true,
            force: false,
        });
       /* const user = await User.create({
            first_name: 'John',
        })*/
  /*      const users = await User.findAll();
        console.log(users.every(user => user instanceof User)); // true
        console.log("All users:", JSON.stringify(users, null, 2));*/

       /*const user =  await User.destroy({
            where: {
                first_name: "John"
            }
        });*/
    } catch (error) {
        console.error(error)
    }
})();
