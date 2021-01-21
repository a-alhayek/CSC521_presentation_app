const express = require('express');

const router = express.Router();

const TimeslotController = require('../controllers/timeslot-controller');

router.get('/timeslots', TimeslotController.getTimeslots);
router.get('/timeslot/:id', TimeslotController.getTimeslotById);
router.post('/timeslot', TimeslotController.createTimeslot);
router.put('/timeslot/:id', TimeslotController.updateTimeslot);
router.delete('/timeslot/:id', TimeslotController.deleteTimeslot);

module.exports = router;
