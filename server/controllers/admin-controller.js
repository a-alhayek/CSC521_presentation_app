const Admin = require('../models/admin-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

getAdmin = (req, res) => {
  Admin.find({}, (err, admins) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for admins',
      });
    }
    if (!admins) {
      return res.status(404).json({
        success: false,
        error: err,
        message: 'admins not found',
      });
    }
    return res.status(200).json({
      success: true,
      admins: admins,
    });
  });
};

createAdmin = async (req, res) => {
  const body = req.body;
  // console.log('----------------------- createTimeslot: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createTimeslot: body -----------------------')
  // console.log(body);
  if (!body) {
    console.error(`400 in 'createAdmin': you must provide Admin to create.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a admin.',
    });
  }
  const saltRound = 10;
  const { adminid, firstName, lastName } = req.body.admin;
  const password = `${lastName}_${adminid}`;

  await bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.error(`400 in 'hashing the password': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error hashing the password',
      });
    }
    const admin = new Admin({
      adminid,
      passwordHash: hash,
      firstName,
      lastName,
    });
    if (!admin) {
      console.error(`400 in 'createAdmin': 'Admin' is malformed.`);
      return res.status(400).json({
        success: false,
        message: "'Admin' is malformed",
      });
    }
    return admin
      .save()
      .then(() => {
        console.error(`201 in 'createAdmin': Admin created!`);
        return res.status(201).json({
          success: true,
          id: admin._id,
          message: 'Admin created!',
        });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          error: err,
          message: err,
        });
      });
  });
};

deleteAdmin = (req, res) => {
  Admin.findOneAndDelete({ _id: req.params.id }, (err, admin) => {
    if (err) {
      console.error(`400 in 'deleteAdmin': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!admin) {
      console.error(`404 in 'deleteAdmin': admin not found!`);
      return res.status(404).json({
        success: false,
        error: 'Admin not found',
      });
    }
    return res.status(200).json({
      success: true,
      admin: admin,
    });
  });
};

module.exports = {
  deleteAdmin,
  createAdmin,
  getAdmin,
};
