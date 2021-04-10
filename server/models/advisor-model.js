const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvisorSchema = new Schema({
    advisorid: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Advisor', AdvisorSchema);
//          name of the module             name of the module in the db and the db Schema
