const express = require('express');
const router = express.Router();

const Presentation = require('../models/presentationdb');

// Saving the presentation
const savePresentation = (presentation, res) => {
    presentation
        .save()// saving the presentation
        .then(presentation => res.json(presentation)) //spitting put the saved presentation
        .catch((err) => res.status(400).json({ msg: "Error: Could not save the presentation" })); // catch error if there's any

}

//middle ware
router.use('/:id', (req, res, next) => {
    Presentation.findById(req.params.id, (err, presentation) => {
        if (err) {
            return res.json({ msg: "could not find presentation by ID" });
        }
        if (presentation) {
            req.presentation = presentation;
            return next();
        }
        return res.json({ msg: "presentation by ID not found" });

    });

});

// get the presentations
router.get("/", (req, res) => {
    // searching array 
    //this not be the right way to search array
    // maybe consider using the $in operatior 
    // https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in
    // {students : [req.studentid.studentid]}
    Presentation.find() // find mehod return a promise
        .then(presentations => {
            res.json(presentations);
        }).catch(err => res.json({ msg: "Could Not find all preentations." }));
});



router.get("/confirmed", (req, res) => {
    // searching array 
    //this not be the right way to search array
    // maybe consider using the $in operatior 
    // https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in
    // {students : [req.studentid.studentid]}
    Presentation.find({confirm:true}) // find mehod return a promise
        .then(presentations => {
            res.json(presentations);
        }).catch(err => res.json({ msg: "Could Not find all preentations." }));
});
router.get("/unconfirmed", (req, res) => {
    // searching array 
    //this not be the right way to search array
    // maybe consider using the $in operatior 
    // https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in
    // {students : [req.studentid.studentid]}
    Presentation.find({confirm:false}) // find mehod return a promise
        .then(presentations => {
            res.json(presentations);
        }).catch(err => res.json({ msg: "Could Not find all preentations." }));
});
//g
router.get("/:id", (req, res) => res.json(req.presentation));
// searching array 
//this not be the right way to search array
// maybe consider using the $in operatior 
// https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in
// {students : [req.studentid.studentid]}



// post presentation
router.post("/", (req, res) => {
    // Object destructing 
    const { timeslotId, students, advisorId, projectDescription, projectTitle, confirm } = req.body;
    let presentation = new Presentation({
        timeslotId,
        students,
        advisorId,
        projectDescription,
        projectTitle,
        confirm
    });
    // this call const savePresentation 
    savePresentation(presentation, res);
});



// editing presentation

router.put("/:id", (req, res) => {
    // Object destructing 
    const { timeslotId, students, advisorId, projectDescription, projectTitle, confirm } = req.body;
    const { presentation } = req;

    presentation[0].timeslotId = timeslotId;
    // might not need to edit the students while editing the presentation
    presentation[0].students = students;
    presentation[0].advisorId = advisorId;
    presentation[0].projectDescription = projectDescription;
    presentation[0].projectTitle = projectTitle;
    presentation[0].confirm = confirm;
    // this call const savePresentation 
    savePresentation(presentation[0], res);

});


router.patch('/:id' , (req,res) => {
    const {presentation} = req;

    if(req.bodu._id) {
        delete erq.body._id;
    }
    Object.entries(req.body).forEach((field) => {
        const key = field[0];
        const value = field[1];
        presentation[0][key] = value;

    });
    savePresentation(presentation[0], res);
    
});



// deleting presentation

router.delete("/:id", (req, res) => {
    Presentation.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "presentation deleted" }))
        .catch(() => res.json({ msg: "could not find presentation to delete" }));

});


module.exports = router;
