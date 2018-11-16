const db = require('./model');

db.sync({ force: true })
  .then(data => console.log('hahaha>>>>>>', data))
  .catch(err => console.log('mehhhhhh>>>>', err));
