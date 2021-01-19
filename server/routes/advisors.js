const express = require('express');
const router = express.Router();
const Advisor = require('../models/advisordb');



const saveAdvisor = (advisor, res) => {
  advisor
    .save()
    .then(advisor => res.json(advisor))
    .catch((err) => res.status(400).json({ msg: "Error: Could not save Advisor!" }));
}


router.use('/searchById/:id', (req, res, next) => {
  // Searching by object ID

  Advisor.findById(req.params.id, (err, advisor) => {
    if (err) {
      return res.json({ msg: "Error search for advisor by ID" });

    }
    else if (advisor) {

      req.advisor = advisor;
      return next();
    }
    else return res.json({ msg: "could not find a advisor with matching ID" })

  });


  // searching by advisor ID

  // Advisor.find({advisorid:req.params.id}, (err, advisor) => {
  //   if (err) {
  //     return res.json({ msg: "Error search for advisor by ID" });

  //   }
  //   if (advisor) {

  //     req.advisor = advisor;
  //     return next();
  //   }
  //   return res.json({ msg: "could not find a advisor with matching ID" })

  // });

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
  Advisor.find({ major: "CS" })
    .sort({ "lastName": 1 })
    .then(advisors => res.json(advisors))
    .catch(err => res.json({ msg: "could not find all Advisors" }));
});

router.get('/it', (req, res) => {
  Advisor.find({ major: "IT" })
    .sort({ "lastName": 1 })
    .then(advisors => res.json(advisors))
    .catch(err => res.json({ msg: "could not find all Advisors" }));
});
router.get('/searchById/:id', (req, res) => {
  res.json(req.advisor);
});



router.put('/update/:id', (req, res) => {

  Advisor.findById(req.params.id, (err, advisor) => {
    if (err) {
      return res.json({ msg: "Error search for advisor by ID" });

    }
    else if (advisor) {

      const { advisorid, email, passwordHash, firstName, lastName, major } = req.body;
      advisor.advisorid = advisorid;
      advisor.email = email;
      advisor.passwordHash = passwordHash;
      advisor.firstName = firstName;
      advisor.lastName = lastName;
      advisor.major = major;
      saveAdvisor(advisor, res);


    }
    else return res.json({ msg: "could not find a advisor with matching ID" })

  });



});

router.patch('/update/:id', (req, res) => {
  Advisor.findById(req.params.id, (err, advisor) => {
    if (err) {
      return res.json({ msg: "Error search for advisor by ID" });

    }
    else if (advisor) {

      if (req.body._id) { // if by mistake they setUp the ID we can delete the ID so it won't set up
        delete req.body._id;
      }
      Object.entries(req.body).forEach((field) => {
        const key = field[0]; // taking the name of each field
        const value = field[1];// taking the value of each field 
        //testing this line of code was a trouble it turns out this is an array
        advisor[key] = value; // if this field exists set it up to it value
      });
      saveAdvisor(advisor, res);


    }
    else return res.json({ msg: "could not find a advisor with matching ID" })

  });



});


router.post('/', (req, res) => {
  const { advisorid, email, passwordHash, firstName, lastName, major } = req.body;
  let advisor = new Advisor({
    advisorid,
    passwordHash,
    firstName,
    lastName,
    email,
    major
  });
  saveAdvisor(advisor, res);

});

router.delete(':id', (req, res) => {
  Advisor.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "advisor deleted" }))
    .catch((err) => res.json({ msg: "could not delete Advisor" }));

})

module.exports = router;