const express = require('express');
const router = express.Router();

// importing database
const Student = require('../models/studentdb');


// this is for the admin functionallity to use

const saveStudent = (student , res) => {
    student
    .save()
    .then(student => res.json(student))
    .catch(()=> res.status(400).json({msg:"Error: could not save the presentation"}));
};

// middle ware for studentid so we make the code little cleaner
router.use('/:id', (req,res,next) => {
    Student.findById(req.params.id , (err,student) => {
        if(err) { // send back err if any
            return res.json({msg: "Could not find student by ID"});
        }
        if(student) { // add student to the request then send to next 
            req.student = student;
            return next();
        }
        return res.json({msg: "Student by ID not found!" });
    });
});

