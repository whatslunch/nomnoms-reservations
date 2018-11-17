DROP KEYSPACE IF EXISTS reservations;

CREATE KEYSPACE reservations
WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor' : 1}
AND durable_writes = false;

USE reservations;

CREATE TABLE restaurants (
  id uuid PRIMARY KEY,
  name text,
  availableTable int,
  totalTable int,
  openingHour text,
  closingHour text
);

CREATE TABLE reservations (
  id uuid PRIMARY KEY,
  restaurantId int,
  reservee text,
  reservationTime text
);

COPY restaurants (id, name, availableTable, totalTable, openingHour, closingHour) FROM '/Users/zouboyun/Documents/hack-reactor-SDC/nomnoms-reservations/data/restaurants.csv' WITH DELIMITER = ',' AND HEADER = FALSE;
COPY reservations (id, restaurantId, reservee, reservationTime) FROM '/Users/zouboyun/Documents/hack-reactor-SDC/nomnoms-reservations/data/reservations.csv' WITH DELIMITER = ',' AND HEADER = FALSE;