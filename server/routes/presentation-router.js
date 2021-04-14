const express = require('express');

const router = express.Router();

const PresentationController = require('../controllers/presentation-controller');

router.get('/presentations', PresentationController.getPresentations);

router.get('/presentation/advisor/:id', PresentationController.getPresentationsByAdvisor);
router.get('/presentation/timeslot/:id', PresentationController.getPresentationByTimeslotId);
router.get('/presentation/:id', PresentationController.getPresentationById);
router.post('/presentation', PresentationController.createPresentation);
router.put('/presentation/:id', PresentationController.confirmPresenation);
router.put('/presentation/stu/:id', PresentationController.updatePresentation);
router.delete('/presentation/:id', PresentationController.deletePresentation);
router.delete('/presentationstu/:id', PresentationController.deletePresentation);
router.delete('/presentations', PresentationController.removePresentation);

module.exports = router;
//tested on 4:20 AM on Januray/22/21 relized there's one fault in put route:
// when trying to update a document by id and the id is not in database: the database says document updated
// in reality there's no update happened because document doesnpt exists
