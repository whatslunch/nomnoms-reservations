# Project Overview

> System Design Capstone project. Refactored the back-end of an existing web application to store 10M+ records in the database, take less than 50ms to query a single record, and handle 10k rps throughput.

## Related Projects

  - https://github.com/whatslunch/nomnoms-reviews
  - https://github.com/whatslunch/nomnomsDishesAndMenu
  - https://github.com/whatslunch/nomnoms-overview

## CRUD

| Action        | Request       | Route            |  Purpose  |
| ------------- | -------------| ----------------| ---------------|
| Create        | POST          | /api/:restaurant_id/reservations | insert new reservation |
| Read          | GET           | /api/:restaurant_id/reservations | retrieve all reservations for a restaurant |
| Update        | PUT           | /api/:restaurant_id/reservations/:reservation_id | update an existing reservation |
| Delete        | DELETE        | /api/:restaurant_id/reservations/:reservation_id | delete a reservation |


## Deployment

> This web application is currently deployed on AWS EC2. The instance is probably stopped because I want to save money.

### environment setup
### seeding database
### start app server