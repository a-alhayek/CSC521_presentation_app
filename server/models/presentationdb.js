const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresentationSchema = new Schema({
    
    timeslotId : {
        type: String,
        required: true,
        unique: true
    },
    students : [{ // creating an array of String(s)
        type: String,
        required:true,
        unique:true
    }],
    advisorId : {
        type: String,
        required: true,
        unique: true
    },
    projectDescription : {
        type: String,
        requried: true,
        unique: true
    },
    projectTitle: {
        type: String,
        required: true,
        unique: true
    },
    confirm: {
        type: Boolean,
        required: true,
        unique: true
    }
});


module.exports = PresentationDb = mongoose.model('PresentationDb', PresentationSchema);
//          name of the module             name of the module in the db and the db Schema
