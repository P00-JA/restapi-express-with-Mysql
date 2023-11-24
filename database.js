const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(process.env.databaseName,process.env.username,process.env.password,{
    host: process.env.host,
    dialect:'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('connection established successfully!!');
})
    .catch(err =>{
        console.log('unable to connect to database',err);
    });

module.exports = sequelize;