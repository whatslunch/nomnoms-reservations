const Sequelize = require('sequelize');
// create database reservations
// change username alice to your username and password aliceisawesome to your password
// change username in package.json file script writedb
const sequelize = new Sequelize('reservations', 'alice', 'aliceisawesome', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
