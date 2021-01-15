const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeslotSchema = new Schema({
    
    start: {
        type: Date,
        required:true,
        unique:true
    },
    end: {
        type: Date,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
       
    }

});
module.exports = TimeslotDb = mongoose.model('TimeslotDb',TimeslotSchema);

//          name of the module             name of the module in the db and the db Schema
