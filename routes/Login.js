//NPM MODULES
const express = require('express');

const loginRoute = express.Router(); // Allows us to creates routes that we can export to other files

const User = require('../models/User'); // import our model from MongoDb

const bcrypt = require("bcrypt"); // USED FOR HASHING PASSWORDS BEFORE SAVING IT TO THE DATABASE

// Compare User Creditentials
loginRoute.post('/', async (req, res) =>{
  const password = req.body.password;
  // this is same as SELECT * from users where email = 'the email the user typed in'
  const user = await User.findOne({email: req.body.email})

  if(!user){
    res.status(404).send({message: "User does not exist"})

  }else{
      // compare the password the user inputed against the one we have hashed in our database

    bcrypt.compare(password, user.password, (err, result) =>{
        if(result == true){
            console.log("Correct creditals");
            res.status(200).send(user);
            
        }else{
           res.status(404).send("User does not exists")
        }
    })
  }

});

module.exports = { loginRoute }

  

