const db = require('./model');

db.sync({ force: true })
  .then(() => {
    db.close();
  })
  .catch((err) => {
    throw err;
  });
