const express = require('express');
const router = express.Router();
// importing database collections
const Student = require('../models/studentdb');
const TimeSlot = require('../models/timeslot');
const Presentation = require('../models/presentationdb');
const jwt = require('jsonwebtoken');

// Saving the presentation
const savePresentation = (presentation , res) => {
    presentation
    .save()// saving the presentation
    .then(presentation => res.json(presentation)) //spitting put the saved presentation
    .catch(() => res.status(400).json({msg : "Error: Could not save the presentation"})); // catch error if there's any

}
// get the presentations

router.get("/", (req ,res) => {
    // searching array 
    //this not be the right way to search array
    // maybe consider using the $in operatior 
    // https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in
    // {students : [req.studentid.studentid]}
    Presentation.find() // find mehod return a promise
    .then( presentations => {
        res.json(presentations);
    }).catch(err => res.json({ msg: "Could Not find all preentations."}));
})

//
router.get("/id", (req ,res) => {
    // searching array 
    //this not be the right way to search array
    // maybe consider using the $in operatior 
    // https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in
    // {students : [req.studentid.studentid]}
    Presentation.findById(req.params.id) // find mehod return a promise
    .then( presentations => {
        res.json(presentations);
    }).catch(err => res.json({ msg: "Could Not find preentation by id."}));
})

// post presentation
router.post("/" ,(req,res) => {
    // Object destructing 
    const {timeslotId, students , advisorId, projectDescription, projectTitle, confirm} = req.body;
    
    
    let presentation = new Presentation ({
        timeslotId,
        students,
        advisorId,
        projectDescription,
        projectTitle,
        confirm
    });
    // this call const savePresentation 
    savePresentation(presentation,res);

});



// editing presentation

router.put("/:id" ,(req,res) => {
    // Object destructing 
    const {timeslotId, students , advisorId, projectDescription, projectTitle, confirm} = req.body;
    Presentation.findById(req.params.id)
    .then(presentation => {
        presentation.timeslotId = timeslotId;
        // might not need to edit the students while editing the presentation
        presentation.students = students;
        presentation.advisorId = advisorId;
        presentation.projectDescription = projectDescription;
        presentation.projectTitle = projectTitle;
        presentation.confirm = confirm;
        // this call const savePresentation 
        savePresentation(presentation,res);

    }).catch(() => res.json({msg: "No presentation found with that id."}))
  
});

// deleting presentation

router.delete("/:id" , (req,res) => {
    Presentation.findByIdAndDelete(req.params.id)
    .then(() => res.json({msg : "presentation deleted"}))
    .catch(()=> res.json({msg: "could not find presentation to delete"}));

});


module.exports = router;