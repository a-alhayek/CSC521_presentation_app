const express = require('express');

const router = express.Router();

const StudentController = require('../controllers/student-controller');

const auth = require('../middleware/student-auth');

router.get('/students', StudentController.getStudents);
router.get('/students/CS', auth.authenticateToken, StudentController.getCS_Students);
router.get('/students/IT', auth.authenticateToken, StudentController.getIT_Students);
router.get('/student/:id', auth.authenticateToken, StudentController.getStudentById);
router.get('/student/stu/:id', StudentController.getStudentByStuId);
router.post('/student', StudentController.createStudent);
router.post('/students', StudentController.createStudents);

router.post('/student/login', auth.studentLogin);
router.put('/student/:id', StudentController.updateStudent);
router.put('/student/status/:id', StudentController.updateStudentStatus);
router.put('/student/statusrest/:id', StudentController.restStudentStatus);
router.delete('/student/:id', StudentController.deleteStudent);
router.delete('/students', StudentController.removeStudents);
module.exports = router;

// student-controller and student-router are fully tested on 3:45 Am January/22/2021

// run node in terminal then require('crypto').randomBytes(64).toString('hex') to get the string
