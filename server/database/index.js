const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ye',
  database: 'reservation_hour'
})

connection.connect();

connection.getReservations = (id, callback) => {
  const query = `
    SELECT reservation.reservee,reservation.time,restaurant.name FROM reservation 
    INNER JOIN restaurant ON reservation.restaurant_id = restaurant.id
    WHERE restaurant.id = ${id}
  `;
  connection.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

connection.getHours = (id, callback) => {
  const query = `
    SELECT hour.weekday,hour.opening_hour,hour.closing_hour,restaurant.name FROM hour
    INNER JOIN restaurant ON hour.restaurant_id = restaurant.id
    WHERE restaurant.id = ${id}
  `;
  connection.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = connection;
