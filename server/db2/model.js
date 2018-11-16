const Sequelize = require('sequelize');
const db = require('./connection');

const Restaurants = db.define('restaurants', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  availableTable: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalTable: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  openingHour: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  closingHour: {
    type: Sequelize.TIME,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const Reservations = db.define('reservations', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  restaurantId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reservee: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reservationTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Reservations.hasMany(Restaurants, { foreignKey: 'fk_reservation' });
Restaurants.belongsTo(Reservations, { foreignKey: 'fk_reservation' });

module.exports = db;
