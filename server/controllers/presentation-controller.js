const Presentation = require('../models/presentation-model');

getPresentations = (req, res) => {
  Presentation.find({}, (err, presentations) => {
    if (err) {
      console.error(`400 in 'getPresentation ': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for presentation',
      });
    }
    if (!presentations.length) {
      console.error(`404 in 'getpresentation': presentations not found`);
      return res.status(404).json({
        success: false,
        error: 'presentation not found',
        // message: 'error searching for presentations'
      });
    }
    console.log(`200 in 'getPresentations : presentations fetched!`);
    return res.status(200).json({
      success: true,
      presentation: presentations,
    });
  });
};

getPresentationsByAdvisor = (req, res) => {
  Presentation.find({ advisorId: req.params.id }, (err, presentations) => {
    if (err) {
      console.error(`400 in 'getPresentation ': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for presentation',
      });
    }
    if (!presentations.length) {
      console.error(`404 in 'getpresentation': presentations not found`);
      return res.status(404).json({
        success: false,
        error: 'presentation not found',
        // message: 'error searching for presentations'
      });
    }
    console.log(`200 in 'getPresentations : presentations fetched!`);
    return res.status(200).json({
      success: true,
      presentations: presentations,
    });
  });
};

getPresentationById = (req, res) => {
  Presentation.find({ studentsId: req.params.id }, (err, presentations) => {
    if (err) {
      console.error(`400 in 'getPresentationById': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for presentation by ID',
      });
    }
    console.log(presentations);
    if (!presentations.length) {
      console.error(`404 in 'getPresentationById': presentation not found`);
      return res.status(404).json({
        success: false,
        error: 'presentations by ID not found',
        // message: 'error searching for presentation'
      });
    }
    console.log(`200 in 'getPresentationById : presentation fetched!`);
    return res.status(200).json({
      success: true,
      presentation: presentations[0],
    });
  });
};
getPresentationByTimeslotId = (req, res) => {
  Presentation.find({ timeslotId: req.params.id }, (err, presentations) => {
    if (err) {
      console.error(`400 in 'getPresentationByTimeslotId': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for presentation by timeslot ID',
      });
    }
    if (!presentations.length) {
      console.error(`404 in 'getPresentationByTimeslotId': presentation not found`);
      return res.status(404).json({
        success: false,
        error: 'presentations by timeslot ID not found',
        // message: 'error searching for presentation'
      });
    }
    console.log(`200 in 'getPresentationByTimeslotId : presentation fetched!`);
    return res.status(200).json({
      success: true,
      presentation: presentations[0],
    });
  });
};

createPresentation = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createPresentation: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createPresentation: body -----------------------')
  // console.log(body);
  if (!body) {
    console.error(`400 in 'createPresentation': you must provide presentation to create.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a presentation.',
    });
  }
  const presentation = new Presentation(body);
  if (!presentation) {
    console.error(`400 in 'createPresentation': 'presentation' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'presentation' is malformed",
    });
  }
  console.log('----------------------- presentations-----------------------');
  // console.log(timeslot);

  return presentation
    .save()
    .then(() => {
      console.error(`201 in 'createPresentation': Presentation created!`);
      return res.status(201).json({
        success: true,
        id: presentation._id,
        message: 'presentation created!',
      });
    })
    .catch(err => {
      // console.error(`caught error in 'createPresentation' ${err.errors.name}`);
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
};

updatePresentation = (req, res) => {
  const body = req.body;
  console.log('----------------------- updatePresentation: req -----------------------');
  // console.log(req);
  // console.log('----------------------- updatePresentation: body -----------------------');
  // console.log(body);
  if (!body) {
    console.error(`400 in 'updatePresentation': you must provide presentation to update.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a presentation to update.',
    });
  }
  const presentationForUpdate = {
    // _id: req.params.id,
    studentsId: body.studentsId,
    timeslotId: body.timeslotId,
    advisorId: body.advisorId,
    projectDescription: body.projectDescription,
    projectTitle: body.projectTitle,
    confirm: body.confirm,
  };
  // console.log('----------------------- updatePresentation: res -----------------------');
  // console.log(res);

  return Presentation.updateOne(
    { _id: req.params.id },
    presentationForUpdate,
    (err, writeOpRes) => {
      if (err) {
        console.error(`404 in 'updatePresentation' : Presentation not found`);
        console.error(err);
        return res.status(404).json({
          success: false,
          error: err,
          message: 'Presentation not found!',
        });
      }
      // TODO: make this neater
      // console.log('----------------------- updatePresentation: Presentation -----------------------');
      // console.log(Presentation);
      console.log(`200 in 'updatePresentation' : Presentation updated!`);
      return res.status(200).json({
        success: true,
        id: req.params.id,
        message: 'Presentation updated',
        writeOpResult: writeOpRes,
      });
    },
  );
};
deletePresentationByStuID = (req, res) => {
  console.log('reached');
  Presentation.findOneAndDelete({ studentsId: req.params.id }, (err, presentation) => {
    if (err) {
      console.error(`400 in 'deletePresentation': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!presentation) {
      console.error(`404 in 'deletePresentation': presentation not found!`);
      return res.status(404).json({
        success: false,
        error: 'Presentation not found',
      });
    }
    return res.status(200).json({
      success: true,
      presentation: presentation,
    });
  });
};

deletePresentation = (req, res) => {
  console.log('reached');
  Presentation.findOneAndDelete({ _id: req.params.id }, (err, presentation) => {
    if (err) {
      console.error(`400 in 'deletePresentation': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!presentation) {
      console.error(`404 in 'deletePresentation': presentation not found!`);
      return res.status(404).json({
        success: false,
        error: 'Presentation not found',
      });
    }
    return res.status(200).json({
      success: true,
      presentation: presentation,
    });
  });
};
removePresentation = (req, res) => {
  Presentation.deleteMany({}, (err, presentations) => {
    if (err) {
      console.error(`400 in 'removeStudents': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!presentations) {
      console.error(`404 in 'removeStudents': students not found!`);
      return res.status(404).json({
        success: false,
        error: 'students not found',
      });
    }
    return res.status(200).json({
      success: true,
      presentations: presentations,
    });
  });
};

module.exports = {
  getPresentations,
  getPresentationById,
  createPresentation,
  updatePresentation,
  deletePresentation,
  getPresentationByTimeslotId,
  removePresentation,
  deletePresentationByStuID,
  getPresentationsByAdvisor,
};
