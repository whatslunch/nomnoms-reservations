/* eslint-disable no-console */
const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const restaurantsCSV = path.join(__dirname, '../data/restaurantsNoSQL.csv');
const streamRestaurants = fs.createWriteStream(restaurantsCSV);
const recordNumber = 10000000;

const generateRestaurants = () => {
  for (let i = 0; i < recordNumber; i += 1) {
    const row = {};
    const fakeName = `${faker.company.bsNoun()} ${faker.company.catchPhraseNoun()} ${faker.lorem.word()} ${i}`;
    let availableTable = (5 + Math.floor(Math.random() * 10));
    const totalTable = availableTable;
    let openingHour = 9 + Math.floor(Math.random() * 3);
    if (openingHour < 10) {
      openingHour = `0${openingHour}`;
    }
    if (Math.random() >= 0.5) {
      openingHour += ':30';
    } else {
      openingHour += ':00';
    }
    let closingHour = 20 + Math.floor(Math.random() * 4);
    if (Math.random() >= 0.5) {
      closingHour += ':30';
    } else {
      closingHour += ':00';
    }
    const reservationNumber = Math.floor(Math.random() * 5);
    const reservations = [];
    for (let j = 0; j < reservationNumber; j += 1) {
      const reservation = {};
      const fakePerson = `${faker.name.findName()}`;
      const randomReservation = faker.date.future(0.05);
      let randomTime = parseInt(12 + (Math.random() * 10), 10);
      if (Math.random() >= 0.5) {
        randomTime += ':30:00';
      } else {
        randomTime += ':00:00';
      }
      const fakeReservation = `${moment(randomReservation).format('YYYY-MM-DD')} ${randomTime}`;
      reservation.id = j + 1;
      reservation.reservee = fakePerson;
      reservation.reservation_time = fakeReservation;
      reservations.push(reservation);
      availableTable -= 1;
    }
    row.id = i + 1;
    row.name = fakeName;
    row.available_table = availableTable;
    row.total_table = totalTable;
    row.opening_hour = openingHour;
    row.closing_hour = closingHour;
    row.reservations = reservations;
    let stringRow = JSON.stringify(row);
    if (i < recordNumber - 1) {
      stringRow = stringRow.concat('\r\n');
    }
    streamRestaurants.write(stringRow);
    if ((i + 1) % (recordNumber / 50) === 0) {
      console.clear();
      console.log(`${(((i + 1) / recordNumber) * 100).toFixed(2)}% completed`);
    }
  }
  streamRestaurants.end();
};

streamRestaurants.on('drain', generateRestaurants);
streamRestaurants.on('finish', () => {
  console.log('restaurants saved in csv!');
});

generateRestaurants();
