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
    for (let i = 1; i < 1000; i++) {
      const rest_id = Math.floor(Math.random() * 100);
      const randomReservee = `${faker.name.findName()}`;
      const randomReservation = faker.date.future(0.05);
      const randomDate = moment(randomReservation).format('YYYY-MM-DD');
      let randomTime = moment(randomReservation).format('HH');
      if (Math.random() >= 0.5) {
        randomTime += ':30';
      } else {
        randomTime += ':00';
      }
      
      reservation.push({
        id: i,
        reservee: randomReservee,
        date: randomDate,
        time: randomTime,
        restaurant_id: rest_id
      });
      const query = 'INSERT INTO reservation(reservee, date, time, restaurant_id) VALUES(?, ?, ?, ?)';
      db.query(query, [randomReservee, randomDate, randomTime, rest_id], (err) => {
        if (err) { console.log(err); } 
      })
    }
    return reservation;
  };

  const generateHour = () => {
    hour = [];
    for (let i = 1; i < 50; i++) {
      const rest_id = Math.floor(Math.random() * 100);
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
      const weekday = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        for (let j = 0; j < weekday.length; j++) {
          hour.push({
            id: i,
            weekday: weekday[j],
            opening_hour: opening_hour,
            closing_hour: closing_hour,
            restaurant_id: rest_id,
          });
          const query = 'INSERT INTO hour(weekday, opening_hour, closing_hour, restaurant_id) VALUES(?, ?, ?, ?)';
          db.query(query, [weekday[j], opening_hour, closing_hour, rest_id], (err) => {
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
