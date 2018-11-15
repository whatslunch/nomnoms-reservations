/* eslint-disable no-console */
const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const restaurantsCSV = path.join(__dirname, '../data/restaurants.csv');
const reservationsCSV = path.join(__dirname, '../data/reservations.csv');
const streamRestaurants = fs.createWriteStream(restaurantsCSV);
const streamReservations = fs.createWriteStream(reservationsCSV);
const recordNumber = 1000000;

const generateRestaurants = () => {
  for (let i = 0; i < recordNumber; i += 1) {
    const row = [];
    const fakeName = `${faker.company.bsNoun()} ${faker.company.catchPhraseNoun()} ${faker.lorem.word()} ${i}`;
    const fakeTable = (5 + Math.floor(Math.random() * 10));
    let openingHour = 9 + Math.floor(Math.random() * 3);
    if (openingHour < 10) {
      openingHour = `0${openingHour}`;
    }
    if (Math.random() >= 0.5) {
      openingHour += ':30';
    } else {
      openingHour += ':00';
    }
    let closingHour = 20 + Math.floor(Math.random() * 5);
    if (Math.random() >= 0.5) {
      closingHour += ':30';
    } else {
      closingHour += ':00';
    }
    row.push(i + 1, fakeName, fakeTable, fakeTable, openingHour, closingHour);
    let stringRow = row.join(',');
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

const generateReservations = () => {
  const reservationNumber = recordNumber * 1.5;
  for (let i = 0; i < reservationNumber; i += 1) {
    const row = [];
    const resId = Math.floor(Math.random() * reservationNumber) + 1;
    const fakePerson = `${faker.name.findName()}`;
    const randomReservation = faker.date.future(0.05);
    let randomTime = parseInt(12 + (Math.random() * 10), 10);
    if (Math.random() >= 0.5) {
      randomTime += ':30:00';
    } else {
      randomTime += ':00:00';
    }
    const fakeReservation = `${moment(randomReservation).format('YYYY-MM-DD')} ${randomTime}`;
    row.push(i + 1, resId, fakePerson, fakeReservation);
    let stringRow = row.join(',');
    if (i < reservationNumber - 1) {
      stringRow = stringRow.concat('\r\n');
    }
    streamReservations.write(stringRow);
    if ((i + 1) % (reservationNumber / 30) === 0) {
      console.clear();
      console.log(`${(((i + 1) / reservationNumber) * 100).toFixed(2)}% completed`);
    }
  }
  streamReservations.end();
};

streamReservations.on('drain', generateReservations);
streamReservations.on('finish', () => {
  console.log('reservations saved in csv!');
});
streamRestaurants.on('drain', generateRestaurants);
streamRestaurants.on('finish', () => {
  console.log('restaurants saved in csv!');
  setTimeout(generateReservations, 500);
});

generateRestaurants();
