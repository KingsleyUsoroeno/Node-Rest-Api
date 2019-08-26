//NPM MODULES
// CREATE THE SERVER
const express = require("express");

const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

require("dotenv/config");

var session = require('express-session')

// MiddleWares
// A Middle ware is a function that gets called anytime we hit a route , sort of an 
// interceptor in retrofit(android)
app.use(express.json());
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(bodyParser.json());

//use sessions for tracking logins
app.use(session({secret: 'work hard',resave: true,saveUninitialized: false}));

// ROUTES
const { router } = require("./routes/post");
const { signUpRouter } = require("./routes/SignUp")
const { loginRoute } = require("./routes/Login")

app.use('/', router) // These middleWare instructs that anytime we go to the post route or
// url we have to direct everything to our post class
app.use('/register', signUpRouter);
app.use('/login', loginRoute);


// Connect to our Db These is Done Because i want to put these App on Heroku
mongoose.connect(process.env.DBCONNECTION, {useNewUrlParser: true}, function(err){
  console.error(`Mongoose connection error: ${err}`);
});

// SWITCHED TO USING MONGODB LOCALLY RATHER THAN USING USING MONGODB ON THE CLOUD
// mongoose.connect('mongodb://localhost/blogDb',{ useNewUrlParser: true });
// mongoose.Promise = global.Promise


// KickStart our Server to listening for request
app.listen(port, () => console.log(`Server is up and running on port ${port}`));