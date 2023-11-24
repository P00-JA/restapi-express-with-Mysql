const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User',{
    name :{
        type : DataTypes.STRING,
        allowNull: false
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false
    },
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      }
});

module.exports = User;