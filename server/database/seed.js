(() => {
  const faker = require('faker');
  const db = require('./index.js');
  const moment = require('moment');

  const generateRestaurant = () => {
    let restaurant = [];
    for (let i = 1; i <= 100; i++) {
      const randomName = `${faker.company.catchPhraseAdjective()} ${faker.company.bsNoun()}`
      const randomTotalTable = (5 + Math.floor(Math.random() * 10));
      restaurant.push({
        id: i,
        name: randomName,
        availableTable: randomTotalTable,
        totalTable: randomTotalTable
      });
      const query = 'INSERT INTO restaurant(name, availableTable, totalTable) VALUES(?, ?, ?)';
      db.query(query, [randomName, randomTotalTable, randomTotalTable], (err) => {
        if (err) { console.log(err); } 
      })
    }
    return restaurant;
  };

  const generateReservation = () => {
    let reservation = [];
    for (let i = 1; i < 2000; i++) {
      const rest_id = Math.floor(Math.random() * 100);
      const randomReservee = `${faker.name.findName()}`;
      const randomReservation = faker.date.future(0.05);
      let randomTime = parseInt(12 + (Math.random() * 10))
      if (Math.random() >= 0.5) {
        randomTime += ':30:00';
      } else {
        randomTime += ':00:00';
      }
      randomTime = `${moment(randomReservation).format('YYYY-MM-DD')} ${randomTime}`;
      
      reservation.push({
        id: i,
        reservee: randomReservee,
        time: randomTime,
        restaurant_id: rest_id
      });

      const query = 'INSERT INTO reservation(reservee, time, restaurant_id) VALUES(?, CAST(? AS DATETIME), ?)';
      db.query(query, [randomReservee, randomTime, rest_id], (err) => {
        if (err) { console.log(err); } 
      })
    }
    return reservation;
  };

  const generateHour = () => {
    hour = [];
    for (let i = 1; i <= 100; i++) {
      const rest_id = i;
      let opening_hour = 6 + Math.floor(Math.random() * 5);
      if (opening_hour > 10) {
        opening_hour = '0' + opening_hour;
      }
      if (Math.random() >= 0.5) {
        opening_hour += ':30';
      } else {
        opening_hour += ':00';
      }
      let closing_hour = 21 + Math.floor(Math.random() * 5);
      if (closing_hour > 24) {
        closing_hour -= 24;
      }
      if (Math.random() >= 0.5) {
        closing_hour += ':30';
      } else {
        closing_hour += ':00';
      }
        for (let j = 0; j < 7; j++) {
          hour.push({
            id: i,
            weekday: j,
            opening_hour: opening_hour,
            closing_hour: closing_hour,
            restaurant_id: rest_id,
          });
          const query = 'INSERT INTO hour(weekday, opening_hour, closing_hour, restaurant_id) VALUES(?, ?, ?, ?)';
          db.query(query, [j, opening_hour, closing_hour, rest_id], (err) => {
            if (err) { console.log(err); }
          });
        }  
    }
      return hour;
  }

  generateRestaurant();
  generateReservation();
  generateHour();
})();
