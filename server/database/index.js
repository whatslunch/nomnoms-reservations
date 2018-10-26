const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ye',
  database: 'yump_sf_reservation'
})

connection.connect();

module.exports = connection;
