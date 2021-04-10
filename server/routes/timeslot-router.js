const express = require('express');

const router = express.Router();

const TimeslotController = require('../controllers/timeslot-controller');

router.get('/timeslots', TimeslotController.getTimeslots);
router.get('/timeslots/available', TimeslotController.getAvailableTimeslots);
router.get('/timeslots/reserved', TimeslotController.getReservedTimeslots);
router.get('/timeslot/:id', TimeslotController.getTimeslotById);
router.post('/timeslots', TimeslotController.createTimeslots);
router.put('/timeslot/:id', TimeslotController.updateTimeslot);
router.put('/timeslot/statusTrue/:id', TimeslotController.changeTimeslotStatusToTrue);
router.put('/timeslot/statusFalse/:id', TimeslotController.changeTimeslotStatusToFalse);
router.delete('/timeslot/:id', TimeslotController.deleteTimeslot);
router.delete('/timeslots', TimeslotController.removeTimeslot);

module.exports = router;
