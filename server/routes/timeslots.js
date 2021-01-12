const { json } = require('express');
const express = require('express');
const router = express.Router();

//timeslot Model
const TimeSlot = require('../models/timeslot');

// saving timeslot
const saveTimeslot = (timeslot , res) => {
    timeslot
    .save()// saving the presentation
    .then(timeslot => res.json(timeslot)) //spitting put the saved presentation
    .catch(() => res.status(400).json({msg : "Error: Could not save the timeslot"})); // catch error if there's any

}


//@route  GET api/timeslot
//@desc Get all timeslots

router.get('/',(req,res) =>{
    TimeSlot.find() //return a promise 
    .sort({"start" : 1}) // 1 for ascending and -1 for decinding order
    .then(timeslots => res.json(timeslots))
    .catch(err => res.json({msg: "could not find all timeslots!"}));


});


// find by id
router.get('/:id',(req,res) =>{
    TimeSlot.findById(req.params.id) //return a promise 
   // .sort({"start" : 1}) // 1 for ascending and -1 for decinding order
    .then(timeslots => res.json(timeslots))
    .catch(err => res.json({msg: "could not find timeslots by ID!"}));


});


// get the avaliable timeslots
router.get('/avaliable' , (req,res) => {
    TimeSlot.find({"status" : false })
    .sort({"start" : 1}) 
    .then(timeslots => res.json(timeslots))
    .catch(err => "could not find avaliable timeslots!");

});


// get the reserved timeslots
router.get('/reserved' , (req,res) => {
    TimeSlot.find({"status" : true })
    .sort({"start" : 1}) 
    .then(timeslots => res.json(timeslots))
    .catch(err => "could not find reserved timeslots!");

});

// add time slot, date format goes like this: 
//"YYYY-MM-DDTHH:MM:SS"
//"2021-01-11T14:30:01"
router.post('/',(req,res) =>{
    const {start , end , status} = req.body;
    
    let timeslot = new TimeSlot({
        start,
        end,
        status

    });
    saveTimeslot(timeslot,res);

});

// delete a time slot based on id

router.delete('/:id',(req,res) => {
    TimeSlot.findByIdAndDelete(req.params.id) // we did req.params.id because it's in url and this actually takes it out from the url 
    .then(() => res.json({msg:"Timeslot deleted"}))
    .catch(()=> res.json({msg:"could not delete timeslot"}));
});







module.exports = router;