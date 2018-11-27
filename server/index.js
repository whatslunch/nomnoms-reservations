/* eslint-disable no-console */
require('newrelic');
const path = require('path');
const express = require('express');
const uniqueId = require('cassandra-driver').types.Uuid;
const connection = require('./db1/connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/:restaurant_id/', express.static(path.join(__dirname, '../public')));

app.get('/api/:restaurant_id/reservations', (req, res) => {
  const id = req.params.restaurant_id;
  const query = 'SELECT opening_hour, closing_hour, reservations FROM reservations.restaurants WHERE id = ? ;';
  connection.execute(query, [id], { prepare: true }, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result.rows[0]);
    }
  });
});

app.post('/api/:restaurant_id/reservations', (req, res) => {
  const id = req.params.restaurant_id;
  const data = req.body;
  data.id = uniqueId.random();
  const query = 'SELECT name, reservations FROM reservations.restaurants WHERE id = ? ;';
  connection.execute(query, [id], { prepare: true }, (error, result) => {
    if (error) {
      throw error;
    } else {
      const reservations = result.rows[0].reservations || [];
      const resName = result.rows[0].name;
      reservations.push(data);
      const insertQuery = 'UPDATE reservations.restaurants SET reservations = ? WHERE id = ? AND name = ? ;';
      connection.execute(
        insertQuery,
        [reservations, id, resName],
        { prepare: true },
        (insertErr) => {
          if (insertErr) {
            throw insertErr;
          } else {
            res.status(201).send();
          }
        },
      );
    }
  });
});

app.put('/api/:restaurant_id/reservations/:reservation_id', (req, res) => {
  const resId = req.params.restaurant_id;
  const reserId = req.params.reservation_id;
  const data = req.body;
  data.id = reserId;
  const query = 'SELECT name, reservations FROM reservations.restaurants WHERE id = ? ;';
  connection.execute(query, [resId], (error, result) => {
    if (error) {
      throw error;
    } else {
      const reservations = result.rows[0].reservations || [];
      const resName = result.rows[0].name;
      reservations.forEach((reservation, index) => {
        if (String(reservation.id) === reserId) {
          reservations.splice(index, 1, data);
        }
      });
      const updateQuery = 'UPDATE reservations.restaurants SET reservations = ? WHERE id = ? AND name = ? ;';
      connection.execute(
        updateQuery,
        [reservations, resId, resName],
        { prepare: true },
        (updateErr) => {
          if (updateErr) {
            throw updateErr;
          } else {
            res.status(200).send();
          }
        },
      );
    }
  });
});

app.delete('/api/:restaurant_id/reservations/:reservation_id', (req, res) => {
  const resId = req.params.restaurant_id;
  const reserId = req.params.reservation_id;
  const query = 'SELECT name, reservations FROM reservations.restaurants WHERE id = ? ;';
  connection.execute(query, [resId], (error, result) => {
    if (error) {
      throw error;
    } else {
      const reservations = result.rows[0].reservations || [];
      const resName = result.rows[0].name;
      reservations.forEach((reservation, index) => {
        if (String(reservation.id) === reserId) {
          reservations.splice(index, 1);
        }
      });
      const updateQuery = 'UPDATE reservations.restaurants SET reservations = ? WHERE id = ? AND name = ? ;';
      connection.execute(
        updateQuery,
        [reservations, resId, resName],
        { prepare: true },
        (deleteErr) => {
          if (deleteErr) {
            throw deleteErr;
          } else {
            res.status(200).send();
          }
        },
      );
    }
  });
});

app.listen(5882, () => {
  console.log('server is up on 5882');
});
