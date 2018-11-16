DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

use reservations;

CREATE TABLE restaurants
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  availableTable INT(11) NOT NULL,
  totalTable INT(11) NOT NULL,
  openingHour TIME NOT NULL,
  closingHour TIME NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE reservations
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  reservee VARCHAR(50) NOT NULL,
  reservationTime DATETIME NOT NULL,
  restaurantId INT(11) NOT NULL,
  PRIMARY KEY (id)

);
