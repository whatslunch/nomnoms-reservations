COPY restaurants ("uuid", "name", "availableTable", "totalTable", "openingHour", "closingHour") FROM '/Users/zouboyun/Documents/hack-reactor-SDC/nomnoms-reservations/data/restaurants.csv' DELIMITERS ',' CSV;
COPY reservations ("uuid", "restaurantId", "reservee", "reservationTime") FROM '/Users/zouboyun/Documents/hack-reactor-SDC/nomnoms-reservations/data/reservations.csv' DELIMITERS ',' CSV;