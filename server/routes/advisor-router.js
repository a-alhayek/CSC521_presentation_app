const express = require('express');

const router = express.Router();

const AdvisorController = require('../controllers/advisor-controller');

router.get('/advisors', AdvisorController.getAdvisors);
router.get('/advisors/CS', AdvisorController.getCS_Advisors);
router.get('/advisors/IT', AdvisorController.getIT_Advisors);
router.get('/advisor/:id', AdvisorController.getAdvisorById);
router.get('/advisor/adv/:id', AdvisorController.getAdvisorByAdvId);
router.post('/advisor', AdvisorController.createAdvisor);
router.post('/advisor/login', AdvisorController.advisorLogin);
router.put('/advisor/:id', AdvisorController.updateAdvisor);
router.delete('/advisor/:id', AdvisorController.deleteAdvisor);

module.exports = router;
//advisor-router and advisor-controller tested on 4:02 Am januray/22/2021