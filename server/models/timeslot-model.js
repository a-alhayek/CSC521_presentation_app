const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeslotSchema = new Schema({
  start: {
    type: String,
    required: true,
    unique: true,
  },
  end: {
    type: String,
    required: true,
    unique: true,
  },
  day: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model('Timeslot', TimeslotSchema); //          name of the module             name of the module in the db and the db Schema
