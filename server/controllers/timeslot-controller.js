const Timeslot = require('../models/timeslot-model');

getTimeslots = (req, res) => {
  Timeslot.find({}, (err, timeslots) => {
    if (err) {
      console.error(`400 in 'getTimeslots': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for timeslots',
      });
    }
    if (!timeslots.length) {
      console.error(`404 in 'getTimeslots': timeslots not found`);
      return res.status(404).json({
        success: false,
        error: 'Timeslots not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getTimeslots : Timeslots fetched!`);
    return res.status(200).json({
      success: true,
      timeslots: timeslots,
    });
  });
};

getReservedTimeslots = (req, res) => {
  Timeslot.find({ status: true }, (err, timeslots) => {
    if (err) {
      console.error(`400 in 'getReservedTimeslots': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for reserved timeslots',
      });
    }
    if (!timeslots.length) {
      console.error(`404 in 'getReservedTimeslots': reserved timeslots not found`);
      return res.status(404).json({
        success: false,
        error: 'Reserved Timeslots not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getReservedTimeslots : Reserved Timeslots fetched!`);
    console.log(typeof timeslots);
    return res.status(200).json({
      success: true,
      timeslots: timeslots,
    });
  });
};

getAvailableTimeslots = (req, res) => {
  Timeslot.find({ status: false }, (err, timeslots) => {
    if (err) {
      console.error(`400 in 'getAvailableTimeslots': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for available timeslots',
      });
    }
    if (!timeslots.length) {
      console.error(`404 in 'getAvailableTimeslots': available timeslots not found`);
      return res.status(404).json({
        success: false,
        error: 'available Timeslots not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getAvailableTimeslots : available Timeslots fetched!`);
    return res.status(200).json({
      success: true,
      timeslots: timeslots,
    });
  });
};

getTimeslotById = (req, res) => {
  Timeslot.find({ _id: req.params.id }, (err, timeslots) => {
    if (err) {
      console.error(`400 in 'getTimeslotById': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
        message: 'error searching for timeslots by ID',
      });
    }
    if (!timeslots.length) {
      console.error(`404 in 'getTimeslotById': timeslots not found`);
      return res.status(404).json({
        success: false,
        error: 'Timeslot by ID not found',
        // message: 'error searching for timeslots'
      });
    }
    console.log(`200 in 'getTimeslotById : Timeslots fetched!`);
    return res.status(200).json({
      success: true,
      timeslots: timeslots[0],
    });
  });
};

createTimeslot = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createTimeslot: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createTimeslot: body -----------------------')
  // console.log(body);
  if (!body) {
    console.error(`400 in 'createTimeslot': you must provide timeslot to create.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a timeslot.',
    });
  }
  const timeslot = new Timeslot(body);
  if (!timeslot) {
    console.error(`400 in 'createTimeslot': 'timeslot' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'timeslot' is malformed",
    });
  }
  // console.log('----------------------- createTimeslot: timeslot -----------------------')
  // console.log(timeslot);

  return timeslot
    .save()
    .then(() => {
      console.error(`201 in 'createTimeslot': Timeslot created!`);
      return res.status(201).json({
        success: true,
        id: timeslot._id,
        message: 'timeslot created!',
      });
    })
    .catch(err => {
      // console.error(`caught error in 'createTimeslot' ${err.errors.name}`);
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

createTimeslots = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createTimeslot: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createTimeslot: body -----------------------')
  console.log(body);
  if (!body) {
    console.error(`400 in 'createTimeslot': you must provide timeslot to create.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a timeslot.',
    });
  }
  const { timeslots } = body;
  Timeslot.insertMany(timeslots, (err, docs) => {
    if (err) {
      console.error(`400 in 'createTimeslots': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,

      message: 'Timeslots created',
      document: docs,
    });
  });
};

updateTimeslot = (req, res) => {
  const body = req.body;
  // console.log('----------------------- updateItem: req -----------------------');
  // console.log(req);
  // console.log('----------------------- updateTimeslot: body -----------------------');
  // console.log(body);
  if (!body) {
    console.error(`400 in 'updateTimeslot': you must provide timeslot to update.`);
    return res.status(400).json({
      sucess: false,
      error: 'You must provide a timeslot to update.',
    });
  }
  const timeslotForUpdate = {
    _id: req.params.id,
    start: body.start,
    end: body.end,
    day: body.day,
    status: body.status,
  };
  // console.log('----------------------- updateTimeslot: res -----------------------');
  // console.log(res);

  return Timeslot.updateOne({ _id: req.params.id }, timeslotForUpdate, (err, writeOpRes) => {
    if (err) {
      console.error(`404 in 'updateTimeslot' : Timeslot not found`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
        message: 'Timeslot not found!',
      });
    }
    // TODO: make this neater
    // console.log('----------------------- updateTimeslot: Timeslot -----------------------');
    // console.log(Timeslot);
    console.log(`200 in 'updateTimeslot' : Timeslot updated!`);
    return res.status(200).json({
      success: true,
      id: req.params.id,
      message: 'Timeslot updated',
      writeOpResult: writeOpRes,
    });
  });
};

deleteTimeslot = (req, res) => {
  Timeslot.findOneAndDelete({ _id: req.params.id }, (err, timeslot) => {
    if (err) {
      console.error(`400 in 'deleteTimeslot': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!timeslot) {
      console.error(`404 in 'deleteTimeslot': timeslot not found!`);
      return res.status(404).json({
        success: false,
        error: 'Timeslot not found',
      });
    }
    return res.status(200).json({
      success: true,
      timeslot: timeslot,
    });
  });
};

module.exports = {
  getTimeslots,
  getTimeslotById,
  createTimeslot,
  updateTimeslot,
  deleteTimeslot,
  getAvailableTimeslots,
  getReservedTimeslots,
  createTimeslots,
};
