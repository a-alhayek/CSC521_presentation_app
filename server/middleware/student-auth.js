//login function
require('dotenv').config();
const Student = require('../models/student-model');
const Admin = require('../models/admin-model');
const Advisor = require('../models/advisor-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

authenticateToken = (req, res, next) => {
  let publicURLS = [{ url: '/api/student/login', method: 'POST' }];

  let isPublic = false;

  for (var i = 0; i < publicURLS.length; i++) {
    const { url, method } = publicURLS[i];
    if (req.url.includes(url) && req.method === method) {
      isPublic = true;
      break;
    }
  }

  if (isPublic) {
    next();

    return;
  }

  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json({ msg: 'Invalid token. Access Denied' });
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userid) => {
    if (err) return res.status(401).json({ message: 'error in verify' });
    console.log(userid);
    req.userid = userid;
    next();
  });
};

studentLogin = (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`400 in 'studentLogin': you must provide studentId and password to login.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a studentid and password to login.',
    });
  }
  const { studentid, password } = body;
  // search if this id is in student collection
  Student.findOne({ studentid }, (err, student) => {
    if (err) {
      console.error(`400 in 'studentLogin': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error in studentLogin',
      });
    }
    //if student not found call supervisorlogin then if supervisor not found call admin login
    else if (!student) {
      console.error(`404 in 'studentLogin': StudentID not found`);
      return res.status(404).json({
        success: false,
        error: 'studentID not found',
        // message: 'error searching for timeslots'
      });
    }

    bcrypt.compare(password, student.passwordHash, (err, result) => {
      if (err) {
        console.error(`400 in 'comparing the password': ${err}`);
        return res.status(400).json({
          success: false,
          error: err,
          message: 'error comparing the password',
        });
      } else if (result) {
        jwt.sign(
          {
            studentid: student.studentid,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: '7200s' },
          (err, token) => {
            if (err) {
              console.error(`400 in 'studentLogin- jwt.sign token': ${err}`);
              return res.status(400).json({
                success: false,
                error: err,
                message: 'error in studentLogin- jwt.sign token',
              });
            }
            res.send({
              token,
              user: {
                user: student.studentid,
              },
              role: 'student',
            });
          },
        );
      } else {
        console.error(`500 in 'studentLogin': Invalid password`);
        return res.status(404).json({
          success: false,
          error: 'Invalid password',
          // message: 'error searching for timeslots'
        });
      }
    });
  });
};

adminLogin = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`400 in 'adminLogin': you must provide adminId and password to login.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a adminID and password to login.',
    });
  }
  const { studentid, password } = body;
  await Admin.findOne({ adminid: studentid }, (err, admin) => {
    if (err) {
      console.error(`400 in 'adminLogin': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error in adminLogin',
      });
    } else if (!admin) {
      console.error(`404 in 'adminLogin': Adminid not found`);
      return res.status(404).json({
        success: false,
        error: 'adminid not found',
        // message: 'error searching for timeslots'
      });
    }
    bcrypt.compare(password, admin.passwordHash, (err, result) => {
      if (err) {
        console.error(`400 in 'comparing the password': ${err}`);
        return res.status(400).json({
          success: false,
          error: err,
          message: 'error comparing the password',
        });
      } else if (result) {
        jwt.sign(
          {
            adminid: admin.adminid,
          },
          process.env.ACCESS_TOKEN_SECRET,
          (err, token) => {
            if (err) {
              console.error(`400 in 'adminLogin- jwt.sign token': ${err}`);
              return res.status(400).json({
                success: false,
                error: err,
                message: 'error in adminLogin- jwt.sign token',
              });
            }
            res.send({
              token,
              user: {
                user: admin.adminid,
              },
              role: 'admin',
            });
          },
        );
      } else {
        console.error(`500 in 'adminLogin': Invalid password`);
        return res.status(404).json({
          success: false,
          error: 'Invalid password',
          // message: 'error searching for timeslots'
        });
      }
    });
  });
};

advisorLogin = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`400 in 'advisorLogin': you must provide advisorId and password to login.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a advisorid and password to login.',
    });
  }
  console.log(body);
  const { studentid, password } = body;
  await Advisor.findOne({ advisorid: studentid }, (err, advisor) => {
    if (err) {
      console.error(`400 in 'advisorLogin': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error in advisorLogin',
      });
    } else if (!advisor) {
      console.error(`404 in 'advisorLogin': AdvisorID not found`);
      return res.status(404).json({
        success: false,
        error: 'AdvisorID not found',
        // message: 'error searching for timeslots'
      });
    }
    bcrypt.compare(password, advisor.passwordHash, (err, result) => {
      if (err) {
        console.error(`400 in 'comparing the password': ${err}`);
        return res.status(400).json({
          success: false,
          error: err,
          message: 'error comparing the password',
        });
      } else if (result) {
        jwt.sign(
          {
            advisorid: advisor.advisorid,
          },
          process.env.ACCESS_TOKEN_SECRET,
          (err, token) => {
            if (err) {
              console.error(`400 in 'advisorLogin- jwt.sign token': ${err}`);
              return res.status(400).json({
                success: false,
                error: err,
                message: 'error in advisorLogin- jwt.sign token',
              });
            }
            res.send({
              token,
              user: {
                user: advisor.advisorid,
              },
              role: 'advisor',
            });
          },
        );
      } else {
        console.error(`500 in 'advisorLogin': Invalid password`);
        return res.status(404).json({
          success: false,
          error: 'Invalid password',
          // message: 'error searching for timeslots'
        });
      }
    });
  });
};

module.exports = {
  studentLogin,
  authenticateToken,
  advisorLogin,
  adminLogin,
};

/*
once student logged in and have accses token, 
What student can access:
1) creating a presentation if he does'not have presentation
2) editing presentation if he does have presentation
3) viewing all avaliable timeslots and signup for a timeslot
4) signing up for advisor
*/
