const express = require('express');
const mongoose = require('mongoose');
const app = express();


const API_PORT = process.env.PORT || 8080;

//const auth = require('./middleware/auth')
// (Bodyparser Middleware)
app.use(express.json());



const dbPath = require('./config/keys').mongoURI; // paste in path from Mongo DB.


//Connectung to the database
mongoose.connect(dbPath, {
  dbName: 'you_signup',
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the DB.");
}).catch((err) => {
  console.log("Error connecting to the DB.");
});
//this the function we wanna call when any end point hit that api value
//app.all('/api/*' , auth);


// this will use routers files from the route folder
//any /api/students will transfer to 

app.use('/api/advisors', require('./routes/advisors'));
app.use('/api/students', require('./routes/students'));

app.use('/api/presentations', require('./routes/presentations'));


app.use('/api', require('./routes/timeslots'));



//app.use('api/auth' , require('./routes/auth'));



app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));
