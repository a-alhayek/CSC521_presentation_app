/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const app = express();
const timeslotRouter = require('./routes/timeslot-router');
const advisorRouter= require('./routes/advisor-router');
const studentRouter= require('./routes/student-router');
const presentationRouter = require('./routes/presentation-router');
const bodyParser = require('body-parser');
const db = require('./db/dbConnection');
//const auth = require('./middleware/auth');
const API_PORT = process.env.PORT || 8080;

//const auth = require('./middleware/auth')
// (Bodyparser Middleware)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//this the function we wanna call when any end point hit that api value
//app.all('/api/*' , auth);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// this will use routers files from the route folder
//any /api/students will transfer to

//app.all('/api/*',auth);

app.use('/api',advisorRouter );
app.use('/api',studentRouter );

app.use('/api', presentationRouter);

app.use('/api', timeslotRouter);

//app.use('api/auth' , require('./routes/auth'));

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));
