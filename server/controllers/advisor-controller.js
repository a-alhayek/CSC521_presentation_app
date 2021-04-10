const Advisor = require('../models/advisor-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

getAdvisors = (req, res) => {
  Advisor.find({}, (err, advisors) => {
    if (err) {
      console.error(`400 in 'getAdvisors': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for advisors',
      });
    }
    if (!advisors.length) {
      console.error(`404 in 'getAdvisors': advisors not found`);
      return res.status(404).json({
        success: false,
        error: 'advisors not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getAdvisors : advisors fetched!`);
    return res.status(200).json({
      success: true,
      advisors: advisors,
    });
  });
};

getCS_Advisors = (req, res) => {
  Advisor.find({ major: 'CS' }, (err, advisors) => {
    if (err) {
      console.error(`400 in 'getCS_Advisors': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for CS Advisors',
      });
    }
    if (!advisors.length) {
      console.error(`404 in 'getCS_Advisors': CS advisors not found`);
      return res.status(404).json({
        success: false,
        error: 'CS Advisors not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getCS_Advisors : CS Advisors fetched!`);
    return res.status(200).json({
      success: true,
      advisors: advisors,
    });
  });
};
getIT_Advisors = (req, res) => {
  Advisor.find({ major: 'IT' }, (err, advisors) => {
    if (err) {
      console.error(`400 in 'getIT_Advisors': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for IT advisors',
      });
    }
    if (!advisors.length) {
      console.error(`404 in 'getIT_Advisors': IT advisors not found`);
      return res.status(404).json({
        success: false,
        error: 'IT advisors not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getIT_Advisors : IT advisors fetched!`);
    return res.status(200).json({
      success: true,
      advisors: advisors,
    });
  });
};

getAdvisorById = (req, res) => {
  Advisor.find({ _id: req.params.id }, (err, advisors) => {
    if (err) {
      console.error(`400 in 'getAdvisorById': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for advisor by ID',
      });
    }
    if (!advisors.length) {
      console.error(`404 in 'getAdvisorById': advisor not found`);
      return res.status(404).json({
        success: false,
        error: 'advisors by ID not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getAdvisorById : advisor fetched!`);
    return res.status(200).json({
      success: true,
      advisor: advisors[0],
    });
  });
};

getAdvisorByAdvId = (req, res) => {
  Advisor.find({ advisorid: req.params.id }, (err, advisors) => {
    if (err) {
      console.error(`400 in 'getAdvisorByAdvId': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for Advisor by ID',
      });
    }
    if (!advisors.length) {
      console.error(`404 in 'getAdvisorByAdvId': Advisor not found`);
      return res.status(404).json({
        success: false,
        error: 'Advisor by ID not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getAdvisorByAdvId : Advisor fetched!`);
    return res.status(200).json({
      success: true,
      advisor: advisors[0],
    });
  });
};

createAdvisor = async (req, res) => {
  const body = req.body;
  // console.log('----------------------- createTimeslot: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createTimeslot: body -----------------------')
  // console.log(body);
  if (!body) {
    console.error(`400 in 'createAdvisor': you must provide Advisor to create.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a Advisor.',
    });
  }
  const saltRound = 10;
  const { advisorid, email, firstName, lastName, major } = req.body.advisor;
  const password = `${lastName}_${advisorid}`;

  await bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.error(`400 in 'hashing the password': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error hashing the password',
      });
    }
    const advisor = new Advisor({
      advisorid,
      email,
      passwordHash: hash,
      firstName,
      lastName,
      major,
    });
    if (!advisor) {
      console.error(`400 in 'createAdvisor': 'Advisor' is malformed.`);
      return res.status(400).json({
        success: false,
        message: "'Advisor' is malformed",
      });
    }
    return advisor
      .save()
      .then(() => {
        console.error(`201 in 'createAdvisor': Advisor created!`);
        return res.status(201).json({
          success: true,
          id: advisor._id,
          message: 'Advisor created!',
        });
      })
      .catch(err => {
        // console.error(`caught error in 'createAdvisor' ${err.errors.name}`);
        // Object.keys(err.errors).forEach((errorKey) => {
        // 	console.error(`Error for: ${errorKey}`);
        // 	console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
        // });
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

advisorLogin = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`400 in 'advisorLogin': you must provide advisorId and password to login.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a advisorid and password to login.',
    });
  }
  const { advisorid, password } = body;
  await Advisor.findOne({ advisorid }, (err, advisor) => {
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
              advisor: {
                advisor: advisor.advisorid,
              },
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

updateAdvisor = (req, res) => {
  const body = req.body;
  // console.log('----------------------- updateItem: req -----------------------');
  // console.log(req);
  // console.log('----------------------- updateTimeslot: body -----------------------');
  // console.log(body);
  if (!body) {
    console.error(`400 in 'updateAdvisor': you must provide advisor to update.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a advisor to update.',
    });
  }

  const advisorForUpdate = {
    _id: req.params.id,
    advisorid: body.advisorid,
    email: body.email,
    passwordHash: body.passwordHash,
    firstName: body.firstName,
    lastName: body.lastName,
    major: body.major,
  };
  // console.log('----------------------- updateTimeslot: res -----------------------');
  // console.log(res);

  return Advisor.updateOne({ _id: req.params.id }, advisorForUpdate, (err, writeOpRes) => {
    if (err) {
      console.error(`404 in 'updateAdvisor' : Advisor not found`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
        message: 'Advisor not found!',
      });
    }
    // TODO: make this neater
    // console.log('----------------------- updateTimeslot: Timeslot -----------------------');
    // console.log(Timeslot);
    return writeOpRes;
  })
    .then(() => {
      // console.log('----------------------- updateTimeslot - findOne: res -----------------------');
      // console.log(res);
      console.log(`200 in 'updateAdvisor' : Advisor updated!`);
      return res.status(200).json({
        success: true,
        id: req.params.id,
        message: 'Advisor updated',
        // writeOpResult: res
      });
    })
    .catch(err => {
      console.error(`caught error in 'updateAdvisor' ${err}`);
      console.error(err);
      return err;
    });
};

deleteAdvisor = (req, res) => {
  Advisor.findOneAndDelete({ _id: req.params.id }, (err, advisor) => {
    if (err) {
      console.error(`400 in 'deleteAdvisor': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!advisor) {
      console.error(`404 in 'deleteAdvisor': advisor not found!`);
      return res.status(404).json({
        success: false,
        error: 'Advisor not found',
      });
    }
    return res.status(200).json({
      success: true,
      advisor: advisor,
    });
  });
};

module.exports = {
  getAdvisors,
  getAdvisorById,
  getAdvisorByAdvId,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
  getIT_Advisors,
  getCS_Advisors,
  advisorLogin,
};
