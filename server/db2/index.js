/* eslint-disable eol-last */
/* eslint-disable consistent-return */
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: 'alice', // change this to your username
//     password: 'aliceisawesome',
//     database: 'test',
//   },
// });

// knex.schema.hasTable('users').then((exists) => {
//   if (!exists) {
//     return knex.schema.createTable('users', (t) => {
//       t.increments('id').primary();
//       t.string('first_name', 100);
//       t.string('last_name', 100);
//       t.text('bio');
//     });
//   }
// });

const { Client } = require('pg');

const client = new Client({
  user: 'alice',
  host: 'localhost',
  database: 'test',
  password: 'aliceisawesome',
});
client.connect();

client.query('SELECT * FROM weather', (err, res) => {
  if (err) {
    console.log('>>>>>>>>>ERR', err);
  } else {
    console.log('>>>>>>>>>>>RES', res);
  }
  client.end();
});