const express = require('express');

const router = express.Router();

const StudentController = require('../controllers/student-controller');

const auth = require('../middleware/student-auth');

router.get('/students', auth.authenticateToken, StudentController.getStudents);
router.get('/students/CS', auth.authenticateToken, StudentController.getCS_Students);
router.get('/students/IT', auth.authenticateToken, StudentController.getIT_Students);
router.get('/student/:id', auth.authenticateToken, StudentController.getStudentById);
router.get('/student/stu/:id', auth.authenticateToken, StudentController.getStudentByStuId);
router.post('/student', StudentController.createStudent);
router.post('/student/login', auth.studentLogin);
router.put('/student/:id', auth.authenticateToken, StudentController.updateStudent);
router.delete('/student/:id', auth.authenticateToken, StudentController.deleteStudent);
module.exports = router;

// student-controller and student-router are fully tested on 3:45 Am January/22/2021

// run node in terminal then require('crypto').randomBytes(64).toString('hex') to get the string
