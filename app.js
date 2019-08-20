const express = require("express");

const app = express();

const mongoose = require("mongoose");

require("dotenv/config");
app.use(express.json());
const cors = require('cors');

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));

// MiddleWares
// A Middle ware is a function that gets called anytime we hit a route , sort of an 
// interceptor in retrofit(android)
app.use(cors())
app.use(bodyParser.json())

// ROUTES
const { router } = require("./routes/post")

app.use('/', router) // These middleWare instructs that anytime we go to the post route or
// url we have to direct everything to our post class


// Connect to our Db
mongoose.connect(process.env.DBCONNECTION, {useNewUrlParser: true});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

// KickStart our Server to listening for request
app.listen(3000);