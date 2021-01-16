const express = require('express');
const router = express.Router();
const Advisor = require('../models/advisordb');



const saveAdvisor = (advisor ,res) =>{
  advisor
  .save()
  .then(advisor => res.json(advisor))
  .catch((err) => res.status(400).json({msg:"Error: Could not save Advisor!"}));
}


router.use('/searchById/:id', (req, res, next) => {
  // Searching by object ID
    if (req.params.id.length >8 ){
    Advisor.findById(req.params.id, (err, advisor) => {
      if (err) {
        return res.json({ msg: "Error search for advisor by ID" });
  
      }
      if (advisor) {
        
        req.advisor = advisor;
        return next();
      }
      return res.json({ msg: "could not find a advisor with matching ID" })
  
    });}

    // searching by advisor ID

  Advisor.find({advisorid:req.params.id}, (err, advisor) => {
    if (err) {
      return res.json({ msg: "Error search for advisor by ID" });

    }
    if (advisor) {
     
      req.advisor = advisor;
      return next();
    }
    return res.json({ msg: "could not find a advisor with matching ID" })

  });

});




router.get('/', (req, res) => {
  Advisor.find()
    .sort({ "lastName": 1 })
    .then(advisors => res.json(advisors))
    .catch(err => res.json({ msg: "could not find all Advisors" }));
});

router.get('/searchById/:id', (req, res) => {
  res.json(req.advisor);
});

// get by major

router.get('/cs', (req, res) => {
  Advisor.find({major:"CS"})
    .sort({ "lastName": 1 })
    .then(advisors => res.json(advisors))
    .catch(err => res.json({ msg: "could not find all Advisors" }));
});

router.get('/it', (req, res) => {
  Advisor.find({major:"IT"})
    .sort({ "lastName": 1 })
    .then(advisors => res.json(advisors))
    .catch(err => res.json({ msg: "could not find all Advisors" }));
});
router.get('/searchById/:id', (req, res) => {
  res.json(req.advisor);
});



router.put('/searchById/:id' , (req,res) =>{
  const{advisor} = req;
  const { advisorid, email, passwordHash, firstName, lastName, major } = req.body;
  advisor[0].advisorid = advisorid;
  advisor[0].email = email;
  advisor[0].passwordHash = passwordHash;
  advisor[0].firstName = firstName;
  advisor[0].lastName = lastName;
  advisor[0].major = major ;


  saveAdvisor(advisor[0],res);

});

router.patch('/searchById/:id' , (req,res) => {
  const {advisor} = req;

  if(req.body._id){ // if by mistake they setUp the ID we can delete the ID so it won't set up
    delete req.body._id; 
  }
  Object.entries(req.body).forEach((field) => {
    const key = field[0]; // taking the name of each field
    const value = field[1];// taking the value of each field 
    //testing this line of code was a trouble it turns out this is an array
    advisor[0][key] = value; // if this field exists set it up to it value
  });
  saveAdvisor(advisor[0],res);

});


router.post('/' , (req,res) => {
  const { advisorid, email, passwordHash, firstName, lastName, major } = req.body;
  let advisor = new Advisor ({
    advisorid,
    passwordHash,
    firstName,
    lastName,
    email,
    major
  });
  saveAdvisor(advisor,res);

});

router.delete(':id' , (req,res) => {
  Advisor.findByIdAndDelete(req.params.id)
  .then(() => res.json({msg:"advisor deleted"}))
  .catch((err) => res.json({msg: "could not delete Advisor"}));
  
})

module.exports = router;