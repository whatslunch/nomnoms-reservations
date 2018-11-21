DROP KEYSPACE IF EXISTS reservations;

CREATE KEYSPACE reservations
WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor' : 1}
AND durable_writes = false;

USE reservations;

CREATE TYPE reservation (
  reservee text,
  reservation_time text
);

CREATE TABLE restaurants (
  id int,
  name text,
  available_table int,
  total_table int,
  opening_hour text,
  closing_hour text,
  reservations list<frozen <reservation>>,
  PRIMARY KEY (id, name)
);

CREATE INDEX on restaurants(name);