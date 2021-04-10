const express = require('express');

const router = express.Router();

const AdminController = require('../controllers/admin-controller');

router.get('/admins', AdminController.getAdmin);

router.post('/admin', AdminController.createAdmin);

router.delete('/admin/:id', AdminController.deleteAdmin);

module.exports = router;
//advisor-router and advisor-controller tested on 4:02 Am januray/22/2021
