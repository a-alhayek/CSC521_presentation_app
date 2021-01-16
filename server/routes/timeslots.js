const express = require('express');
const router = express.Router();

//timeslot Model
const TimeSlot = require('../models/timeslotdb');

// saving timeslot
const saveTimeslot = (timeslot, res) => {

  timeslot
    .save()// saving the presentation
    .then(timeslot => res.json(timeslot)) //spitting put the saved presentation
    .catch((err) => res.status(400).json({ msg: "Error: Could not save the timeslot" })); // catch error if there's any

}
//middle ware for every mehod that use findById
router.use('/searchById/:id', (req, res, next) => {

  TimeSlot.findById(req.params.id, (err, timeslot) => {
    if (err) {
      return res.json({ msg: "Error searching for timeslot with id" });
    }
    if (timeslot) {
      req.timeslot = timeslot;
      return next();
    }
    return res.json({ msg: "could not find a timeslot with this ID" });

  });


});

//@route  GET api/timeslot
//@desc Get all timeslots

router.get('/', (req, res) => {
  TimeSlot.find() //return a promise 
    .sort({ "start": 1 }) // 1 for ascending and -1 for decinding order
    .then(timeslots => res.json(timeslots))
    .catch(err => res.json({ msg: "could not find all timeslots!" }));


});


// find by id
router.get('/searchById/:id', (req, res) => {
  res.json(req.timeslot);
});


// get the avaliable timeslots
router.get('/avaliable', (req, res) => {
  TimeSlot.find({ "status": false })
    .sort({ "start": 1 })
    .then(timeslots => res.json(timeslots))
    .catch(err => "could not find avaliable timeslots!");

});


// get the reserved timeslots
router.get('/reserved', (req, res) => {
  TimeSlot.find({ "status": true })
    .sort({ "start": 1 })
    .then(timeslots => res.json(timeslots))
    .catch(err => "could not find reserved timeslots!");

});

router.put('/searchById/:id', (req, res) => {

  const { timeslot } = req;

  timeslot[0].start = req.body.start;
  timeslot[0].end = req.body.end;
  timeslot[0].status = req.body.status;

  saveTimeslot(timeslot[0], res);

});


router.patch('searchById/:id' , (req,res) => {
  const {timeslot } = req;

  if(req.bodu._id){
    delete req.body.id;
  }
  Object.entries(req.body).forEach((field) => {
    const key = field[0]; // taking the name of each field
    const value = field[1];// taking the value of each field 
    //testing this line of code was a trouble it turns out this is an array
    timeslot[0][key] = value; // if this field exists set it up to it value
  });
  saveTimeslot(timeslot[0],res);

});


// add time slot, date format goes like this: 
//"YYYY-MM-DDTHH:MM:SS"
//"2021-01-11T14:30:01"
router.post('/', (req, res) => {

  const { start, end, status } = req.body;

  let timeslot = new TimeSlot({
    start,
    end,
    status

  });
  saveTimeslot(timeslot, res);

});

// delete a time slot based on id

router.delete('/:id', (req, res) => {
  TimeSlot.findByIdAndDelete(req.params.id) // we did req.params.id because it's in url and this actually takes it out from the url 
    .then(() => res.json({ msg: "Timeslot deleted" }))
    .catch(() => res.json({ msg: "could not delete timeslot" }));
});







module.exports = router;