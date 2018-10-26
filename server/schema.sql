CREATE DATABASE yump_sf_reservation;

use yump_sf_reservation;

CREATE TABLE restaurant
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE reservation
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  reservee VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  rest_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rest_id) REFERENCES restaurant(id)

);
