const Timeslot = require('../models/timeslot');

getTimeslots = async (req, res) => {
	await Timeslot.find({}, (err, timeslots) => {
		if (err) {
			console.error(`400 in 'getTimeslots': ${err}`);
			return res.status(400).json({
				success: false,
				error: err,
				message: 'error searching for timeslots'
			});
		}
		if (!timeslots.length) {
			console.error(`404 in 'getTimeslots': timeslots not found`);
			return res.status(404).json({
				success: false,
				error: 'Timeslots not found'
				// message: 'error searching for timeslots'
			});
		}
		console.log(`200 in 'getTimeslots : Timeslots fetched!`);
		return res.status(200).json({
			success: true,
			timeslots: timeslots
		});
	}).catch((err) => {
		console.error(`cought error in 'getTimeslots': ${err}`);
		console.error(err);
		return res.status(404).json({
			success: false,
			error: err
		});
	});
};

getTimeslotById = async (req, res) => {
	await Timeslot.find({ _id: req.params.id }, (err, timeslots) => {
		if (err) {
			console.error(`400 in 'getTimeslotById': ${err}`);
			return res.status(400).json({
				success: false,
				error: err,
				message: 'error searching for timeslots by ID'
			});
		}
		if (!timeslots.length) {
			console.error(`404 in 'getTimeslotById': timeslots not found`);
			return res.status(404).json({
				success: false,
				error: 'Timeslot by ID not found'
				// message: 'error searching for timeslots'
			});
		}
		console.log(`200 in 'getTimeslotById : Timeslots fetched!`);
		return res.status(200).json({
			success: true,
			timeslots: timeslots[0]
		});
	}).catch((err) => {
		console.error(`cought error in 'getTimeslotById': ${err}`);
		console.error(err);
		return res.status(404).json({
			success: false,
			error: err
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
			error: 'You must provide a timeslot.'
		});
	}
	const timeslot = new Timeslot(body);
	if (!timeslot) {
		console.error(`400 in 'createTimeslot': 'timeslot' is malformed.`);
		return res.status(400).json({
			success: false,
			message: "'timeslot' is malformed"
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
				message: 'timeslot created!'
			});
		})
		.catch((err) => {
			console.error(`caught error in 'createTimeslot' ${err.errors.name}`);
			Object.keys(err.errors).forEach((errorKey) => {
				console.error(`Error for: ${errorKey}`);
				console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
			});
			return res.status(400).json({
				success: false,
				error: err.errors,
				message: err.errors.name
			});
		});
};

updateTimeslot = (req,res) => {
  const body = req.body;
  // console.log('----------------------- updateItem: req -----------------------');
	// console.log(req);
	// console.log('----------------------- updateTimeslot: body -----------------------');
  // console.log(body);
  if (!body) {
    console.error(`400 in 'createTimeslot': you must provide timeslot to update.`);
		return res.status(400).json({
			sucess: false,
			error: 'You must provide a timeslot to update.'
		});
  }
  const timeslotForUpdate= {
    _id:req.params.id,
    start : body.start,
    end : body.end,
    status: body.status
  };
  // console.log('----------------------- updateTimeslot: res -----------------------');
	// console.log(res);
  
  return Timeslot.updateOne({_id:req.params.id}, timeslotForUpdate, (err,writeOpRes) => {
    if(err) {
      console.error(`404 in 'updateTimeslot' : Timeslot not found`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error:err,
        message:'Timeslot not found!'
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
    console.log(`200 in 'updateTimeslot' : Timeslot updated!`);
    return res.status(200).json({
      success:true,
      id: req.params.id,
      message:'Timeslot updated'
     // writeOpResult: res
    });
  })
  .catch((err) => {
    console.error(`caught error in 'updateTimeslot' ${err}`);
    console.error(err);
    return err;
  });

};

deleteTimeslot = async (req,res) => {
  await Timeslot.findOneAndDelete({_id: req.params.id} , (err,timeslot) => {
    if(err) {
      console.error(`400 in 'deleteTimeslot': ${err}`);
      return res.status(400).json({
        success: false,
        error:err
      });
    }
    if(!timeslot){
      console.error(`404 in 'deleteTimeslot': timeslot not found!`);
      return res.status(404).json({
        success:false,
        error:'Timeslot not found'
      });
    }
    return res.status(200).json({
      success:true,
      timeslot:timeslot
    });
  }).catch((err)=> {
    console.error(`caught error in 'deleteTimeslot': ${err}`);
    console.error(err);
    return err;

  });
};

module.exports={
  getTimeslots,
  getTimeslotById,
  createTimeslot,
  updateTimeslot,
  deleteTimeslot

};