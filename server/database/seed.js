(() => {
  const faker = require('faker');
  const db = require('./index.js');
  const moment = require('moment');

  const generateRestaurant = () => {
    let restaurant = [];
    for (let i = 1; i <= 100; i++) {
      const randomName = `${faker.company.catchPhraseAdjective()} ${faker.company.bsNoun()}`
      restaurant.push({
        id: i,
        name: randomName
      });
      const query = 'INSERT INTO restaurant(name) VALUES(?)';
      db.query(query, [randomName], (err) => {
        if (err) { console.log(err); } 
      })
    }
    return restaurant;
  };

  const generateReservation = () => {
    let reservation = [];
    for (let i = 1; i < 1000; i++) {
      const rest_id = Math.floor(Math.random() * 100);
      const randomReservee = `${faker.name.findName()}`;
      const randomReservation = faker.date.future(0.05);
      const randomDate = moment(randomReservation).format('YYYY-MM-DD');
      const randomTime = moment(randomReservation).format('HH:mm:ss');
      reservation.push({
        id: i,
        reservee: randomReservee,
        date: randomDate,
        time: randomTime,
        rest_id: rest_id
      });
      const query = 'INSERT INTO reservation(reservee, date, time, rest_id) VALUES(?, ?, ?, ?)';
      db.query(query, [randomReservee, randomDate, randomTime, rest_id], (err) => {
        if (err) { console.log(err); } 
      })
    }
    return reservation;
  };

  generateRestaurant();
  generateReservation();
})();
