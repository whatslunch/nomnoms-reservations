# Project Name

> Front End Capstone (FEC) project. Module displays reservation table with time and number of guests. It also includes hours of operation of the restaurant and shows if the restaurant is open now.

![alt text](https://i.imgur.com/lEWUORR.jpg)
![alt text](https://i.imgur.com/DjBp7ox.jpg)

## Related Projects

  - https://github.com/YumpSF/popular-dishes-and-full-menu
  - https://github.com/YumpSF/overview
  - https://github.com/YumpSF/Recommended-Reviews-Module
  - https://github.com/YumpSF/proxy-david

## Usage

> First, you need to create the database. Schema file is stored in the server directory. To create scheam, simply type 'npm run db'.
> Dummy datas can be generated if you want. Type 'npm run seed' to do so.

> Local port to run the module is 5882. 

## CRUD

| Action        | Request       | Route            |  Purpose  |
| ------------- | -------------| ----------------| ---------------|
| Create        | POST          | /api/:restaurant_id/reservation | insert new reservation |
| Read          | GET           | /api/:restaurant_id/hour | retrieve restaurant hours |
| Read          | GET           | /api/:restaurant_id/reservation | retrieve reservation information for a restaurant |
| Update        | PUT           | /api/:restaurant_id/reservation/:reservation_id | update an existing reservation |
| Delete        | DELETE        | /api/:restaurant_id/reservation/:reservation_id | delete a reservation |
