const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  adminid: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    required: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Admin', AdminSchema);
