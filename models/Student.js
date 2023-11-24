const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Student = sequelize.define('Student',{
    name :{
        type : DataTypes.STRING,
        allowNull: false
    },
    class:{
        type : DataTypes.STRING,
        allowNull : false
    },
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      rollNum: {
        allowNull:false,
        type:DataTypes.INTEGER
      } 
});

module.exports = Student;