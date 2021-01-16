
const express = require('express');
const router = express.Router();

const Student = require('../models/studentdb');


const saveStudent = (student, res) => {

  student
    .save()
    .then(student => res.json(student))
    .catch((err) => res.status(400).json({ msg: "error could not save student!" }));


};


router.use('/searchById/:id', (req, res, next) => {
// Searching by object ID
  if (req.params.id.length >8 ){
  Student.findById(req.params.id, (err, student) => {
    if (err) {
      return res.json({ msg: "Error search for student by ID" });

    }
    if (student) {
      
      req.student = student;
      return next();
    }
    return res.json({ msg: "could not find a student with matching ID" })

  });}

// searching by student ID

  Student.find({studentid:req.params.id}, (err, student) => {
    if (err) {
      return res.json({ msg: "Error search for student by ID" });

    }
    if (student) {
     
      req.student = student;
      return next();
    }
    return res.json({ msg: "could not find a student with matching ID" })

  });

});



router.get('/', (req, res) => {
  Student.find()
    .sort({ "lastName": 1 })
    .then(students => res.json(students))
    .catch(err => res.json({ msg: "could not find all students" }));
});

router.get('/searchById/:id', (req, res) => {
  res.json(req.student);
});

// get by major

router.get('/cs', (req, res) => {
  Student.find({major:"CS"})
    .sort({ "lastName": 1 })
    .then(students => res.json(students))
    .catch(err => res.json({ msg: "could not find all students" }));
});

router.get('/it', (req, res) => {
  Student.find({major:"IT"})
    .sort({ "lastName": 1 })
    .then(students => res.json(students))
    .catch(err => res.json({ msg: "could not find all students" }));
});
router.get('/searchById/:id', (req, res) => {
  res.json(req.student);
});


router.put('/searchById/:id' , (req,res) =>{
  const{student} = req;
  const { studentid, email, passwordHash, firstName, lastName, major, isGroup, signupStatus } = req.body;
  student[0].studentid = studentid;
  student[0].email = email;
  student[0].passwordHash = passwordHash;
  student[0].firstName = firstName;
  student[0].lastName = lastName;
  student[0].major = major ;
  student[0].isGroup = isGroup;
  student[0].signupStatus = signupStatus;

  saveStudent(student[0],res);

});
// edit only particaler fields

router.patch('/searchById/:id' , (req,res) => {
  const {student} = req;

  if(req.body._id){ // if by mistake they setUp the ID we can delete the ID so it won't set up
    delete req.body._id; 
  }
  Object.entries(req.body).forEach((field) => {
    const key = field[0]; // taking the name of each field
    const value = field[1];// taking the value of each field 
    //testing this line of code was a trouble it turns out this is an array
    student[0][key] = value; // if this field exists set it up to it value
  });
  saveStudent(student[0],res);

});


router.post('/', (req, res) => {
  
  const { studentid, email, passwordHash, firstName, lastName, major, isGroup, signupStatus } = req.body;
  let student = new Student({
    studentid,
    email,
    passwordHash,
    firstName,
    lastName,
    major,
    isGroup,
    signupStatus
  });
  saveStudent(student, res);
});



router.delete(':id' , (req,res) => {
  Student.findByIdAndDelete(req.params.id)
  .then(() => res.json({msg:"Student deleted"}))
  .catch(() => res.json({msg:"Could not delete Student"}))
})


module.exports = router;