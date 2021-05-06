const mongoose = require('mongoose');
const dbPath = require('../config/keys').mongoURI; // paste in path from Mongo DB.

//Connectung to the database
mongoose
  .connect(dbPath, {
    dbName: 'you_signup',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the DB.');
  })
  .catch(err => {
    console.log('Error connecting to the DB.');
  });

const db = mongoose.connection;

module.exports = db;
