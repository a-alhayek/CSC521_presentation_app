require('dotenv').config();
const Student = require('../models/student-model');

const bcrypt = require('bcryptjs');

getStudents = (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      console.error(`400 in 'getStudents': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for Students',
      });
    }

    if (!students.length) {
      console.error(`404 in 'getStudents': students not found`);
      return res.status(404).json({
        success: false,
        error: 'Sudents not found',
        // message: 'error searching for timeslots'
      });
    }

    console.log(`200 in 'getStudents : Students fetched!`);
    return res.status(200).json({
      success: true,
      students: students,
    });
  }).sort({ firstName: 1, lastName: 1 });
};

getCS_Students = (req, res) => {
  Student.find({ major: 'CS' }, (err, students) => {
    if (err) {
      console.error(`400 in 'getCS_Students': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for CS Students',
      });
    }
    if (!students.length) {
      console.error(`404 in 'getCS_Students': CS students not found`);
      return res.status(404).json({
        success: false,
        error: 'CS Sudents not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getCS_Students : CS Students fetched!`);
    return res.status(200).json({
      success: true,
      students: students,
    });
  });
};
getIT_Students = (req, res) => {
  Student.find({ major: 'IT' }, (err, students) => {
    if (err) {
      console.error(`400 in 'getIT_Students': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for IT Students',
      });
    }

    if (!students.length) {
      console.error(`404 in 'getIT_Students': IT students not found`);
      return res.status(404).json({
        success: false,
        error: 'IT Sudents not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getIT_Students : IT Students fetched!`);
    return res.status(200).json({
      success: true,
      students: students,
    });
  });
};

getStudentById = async (req, res) => {
  await Student.find({ _id: req.params.id }, (err, students) => {
    if (err) {
      console.error(`400 in 'getStudentById': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for Student by ID',
      });
    }
    if (!students.length) {
      console.error(`404 in 'getStudentById': Student not found`);
      return res.status(404).json({
        success: false,
        error: 'Students by ID not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getStudentById : Student fetched!`);
    return res.status(200).json({
      success: true,
      student: students[0],
    });
  });
};

getStudentByStuId = (req, res) => {
  Student.find({ studentid: req.params.id }, (err, students) => {
    if (err) {
      console.error(`400 in 'getStudentById': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for Student by ID',
      });
    }
    if (!students.length) {
      console.error(`404 in 'getStudentById': Student not found`);
      return res.status(404).json({
        success: false,
        error: 'Students by ID not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getStudentById : Student fetched!`);
    return res.status(200).json({
      success: true,
      student: students[0],
    });
  });
};

createStudents = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`400 in 'createStudents': you must provide students to create.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a students.',
    });
  }
  const saltRound = 10;
  let { students } = body;

  try {
    students = students.map(async field => {
      field['passwordHash'] = await bcrypt.hash(field['passwordHash'], saltRound);
      return field;
    });
  } catch (err) {}

  Promise.all(students)
    .then(students => {
      console.log(students);
      Student.insertMany(students, { ordered: false }, (err, docs) => {
        if (err && err['code'] !== null && err['code'] !== 11000) {
          //console.error(`400 in 'createStudents': ${docs} , \nresult: ${JSON.stringify(docs)}`);

          return res.status(400).json({
            success: false,
            error: docs,
          });
        } else if (
          err &&
          err['code'] !== null &&
          err['code'] === 11000 &&
          err.result.nInserted === 0
        ) {
          return res.status(200).json({
            success: true,
            students: err.result.nInserted,

            message: 'No student created please check for duplicates ',
            document: err,
          });
        }
        return res.status(200).json({
          success: true,
          students: students.length,
          message: `All students created`,
          document: docs,
        });
      });
    })
    .catch(err => {
      console.error(`400 in 'hashing the password': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error hashing the password',
      });
    });
};

createStudent = async (req, res) => {
  const body = req.body;
  // console.log('----------------------- createTimeslot: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createTimeslot: body -----------------------')
  // console.log(body);
  if (!body) {
    console.error(`400 in 'createStudent': you must provide student to create.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a student.',
    });
  }
  const saltRound = 10;
  const { studentid, email, firstName, lastName, major, isGroup, signupStatus } = req.body.student;
  const password = `${lastName}_${studentid}`;
  await bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.error(`400 in 'hashing the password': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error hashing the password',
      });
    }
    const student = new Student({
      studentid,
      email,
      passwordHash: hash,
      firstName,
      lastName,
      major,
      isGroup,
      signupStatus,
    });
    if (!student) {
      console.error(`400 in 'createStudent': 'student' is malformed.`);
      return res.status(400).json({
        success: false,
        message: "'student' is malformed",
      });
    }
    return student
      .save()
      .then(student => {
        console.error(`201 in 'createStudent': Student created!`);
        return res.status(201).json({
          success: true,
          id: student._id,
          message: 'Student created!',
        });
      })
      .catch(err => {
        // // console.error(`caught error in 'createStudent' ${err.errors.name}`);
        // // Object.keys(err.errors).forEach((errorKey) => {
        // // 	console.error(`Error for: ${errorKey}`);
        // // 	console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
        // // });
        return res.status(400).json({
          success: false,
          error: err,
          message: err,
        });
      });
  });

  // console.log('----------------------- createTimeslot: timeslot -----------------------')
  // console.log(timeslot);
};

//update function
updateStudent = (req, res) => {
  const body = req.body;
  // console.log('----------------------- updateItem: req -----------------------');
  // console.log(req);
  // console.log('----------------------- updateTimeslot: body -----------------------');
  // console.log(body);
  if (!body) {
    console.error(`400 in 'updateStudent': you must provide student to update.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a student to update.',
    });
  }

  const {
    studentid,
    email,
    password,
    firstName,
    lastName,
    major,
    isGroup,
    signupStatus,
  } = req.body;
  const studentForUpdate = new Student({
    studentid,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    firstName,
    lastName,
    major,
    isGroup,
    signupStatus,
  });

  // console.log('----------------------- updateTimeslot: res -----------------------');
  // console.log(res);

  return Student.updateOne({ _id: req.params.id }, studentForUpdate, (err, writeOpRes) => {
    if (err) {
      console.error(`404 in 'updateStudent' : Student not found`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
        message: 'Student not found!',
      });
    }
    // TODO: make this neater
    // console.log('----------------------- updateTimeslot: Timeslot -----------------------');
    // console.log(Timeslot);
    console.log(`200 in 'updateStudent' : Student updated!`);
    return res.status(200).json({
      success: true,
      id: req.params.id,
      message: 'Student updated',
      writeOpResult: writeOpRes,
    });
  });
};

updateStudentStatus = (req, res) => {
  Student.findOneAndUpdate(
    { studentid: req.params.id },
    { signupStatus: true, isGroup: req.body.group },
    (err, student) => {
      if (err) {
        console.error(`404 in 'updateStudent' : Student not found`);
        console.error(err);
        return res.status(404).json({
          success: false,
          error: err,
          message: 'Student not found!',
        });
      }
      console.log(`200 in 'updateStudent' : Student updated!`);
      return res.status(200).json({
        success: true,
        id: req.params.id,
        message: 'Student updated',
        student: student,
      });
    },
  );
};
restStudentStatus = (req, res) => {
  console.log(' ======================');
  Student.findOneAndUpdate(
    { studentid: req.params.id },
    { signupStatus: false, isGroup: false },
    (err, student) => {
      if (err) {
        console.error(`404 in 'updateStudent' : Student not found`);
        console.error(err);
        return res.status(404).json({
          success: false,
          error: err,
          message: 'Student not found!',
        });
      }
      console.log(`200 in 'updateStudent' : Student updated!`);
      return res.status(200).json({
        success: true,
        id: req.params.id,
        message: 'Student updated',
        student: student,
      });
    },
  );
};
// delete function
deleteStudent = (req, res) => {
  Student.findOneAndDelete({ _id: req.params.id }, (err, student) => {
    if (err) {
      console.error(`400 in 'deleteStudent': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!student) {
      console.error(`404 in 'deleteStudent': student not found!`);
      return res.status(404).json({
        success: false,
        error: 'student not found',
      });
    }
    return res.status(200).json({
      success: true,
      student: student,
    });
  });
};

removeStudents = (req, res) => {
  Student.deleteMany({}, (err, students) => {
    if (err) {
      console.error(`400 in 'removeStudents': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!students) {
      console.error(`404 in 'removeStudents': students not found!`);
      return res.status(404).json({
        success: false,
        error: 'students not found',
      });
    }
    return res.status(200).json({
      success: true,
      students: students,
    });
  });
};

//importing modules
module.exports = {
  getStudents,
  getStudentById,
  getStudentByStuId,
  createStudent,
  createStudents,
  updateStudent,
  deleteStudent,
  getIT_Students,
  getCS_Students,
  removeStudents,
  updateStudentStatus,
  restStudentStatus,
};
