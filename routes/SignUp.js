// NPM MODULES
const express = require("express");

const signUpRouter = express.Router(); // Allows us to creates routes that we can export to other files

const User = require('../models/User')

signUpRouter.post('/', async (req, res) =>{
    try{
        const user = new User(req.body)
        const result = await user.save();
        res.status(201).json(result);
    

    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = { signUpRouter }