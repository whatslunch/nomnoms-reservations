const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ye',
  database: 'reservation_hour'
})

connection.connect();

module.exports = connection;
