const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  isGroup: {
    type: Boolean,
    require: true,
  },
  signupStatus: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model('Student', StudentSchema); //          name of the module             name of the module in the db and the db Schema
