 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcryptjs'); // hash users passwords
 const jwt = require('jsonwebtoken'); // auth token that signifies user is logged in


 const Student = require('../models/studentdb');

// create student
 router.post("/", async (req, res) => {
    // the data that we pull from the request body have to match what inside the parmaters{}
    // taking the student information from the post request body
    const {studentid, email, password, firstName, lastName, major } = req.body; 
    // password varafication 
    if (password.length < 6) {
        //  500 is internal server error with message
        res.status(500).json({msg: "Password length must be greater than 6 characters."});
        return ; // finishing the block
    }
    // Creating new Student 
    let newStudent = new Student ({
        studentid,
        email,
        // passing the password but we salting it as we passing it. so we not saving the password as plain text
        passwordHash: bcrypt.hashSync(password,10),
        firstName,
        lastName,
        major,
        isGroup : false,
        signupStatus : false
    });
    // saving the student in the database
    newStudent
    .save()
    .then(student => {
        // using jwt (json web token) 
        // create an off token to pass for the clint
        jwt.sign({
            // pass what we want to sign the jwt token with 
            // here we creating studentid and giving it studentid value from newStudent
            studentid: newStudent.studentid
            // the 'secret' string should not be contined as hardcode 
        },'secret' ,(err, token ) => {
            if(err) throw err;
            res.send({
                token,
                student:{
                    studentid: student.studentid
                }
            });


        });


    }).catch(err => {
        console.log(err);
        res.status(500).json({msg : `Student ${err.keyValue['studentid']} already exists. Try loggin in.` })

    });

 })



 // loggin in

 router.post("/login" , (req,res) => {
    const {studentid,password } = req.body;
    // search for the student 

    Student.findOne({studentid})
    .then(student => {
        if(!student) {
            res.status(500).json({msg: "No Student with this Student ID: " + studentid});
            return;
        }
        else if(!bcrypt.compareSync(password, student.passwordHash)) {
            res.status(500).json({msg: "Invalid Password"});

        }
        jwt.sign({
            studentid: newStudent.studentid

        }, 'secret', (err, token) => {
            if(err) throw err;

            res.send({
                token,
                student: {
                    studentid: student.studentid
                    
                }
            });
        });


    }).catch(err => {
        console.log(err);
        res.status(500).send(err);

    });

     

 })