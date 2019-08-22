const express = require("express");

const router = express.Router(); // Allows us to creates routes that we can export to other files

const Post = require('../models/PostModel');

//GET ALL POST
router.get('/', async (req, res) =>{
    // Fetch all the post from our Database and send to our user
    try{
       const allPost = await Post.find();
       res.json(allPost);  
    }catch(err){
        res.json({
            status:res.status(404),
            message:err
        })
    }
});

// GET A PARTICULAR POST BY ID
router.get('/:postId', async (req, res) =>{
    try {
        const result = await Post.findById(req.params.postId);
        res.json(result)
        console.log(result);

    } catch (err) {
        console.log(err);
        res.json({message:err})
    }
});

//SUBMIT A POST
router.post('/post', async (req, res) => {
    // req has the information that comes from the route, res is used to send information back to the client
    var post = Post(req.body);
    try{
        const savedPost = await post.save();
        res.json(savedPost)
    }catch(err){
        res.json({
            status:res.status(404),
            message:err
        })
    }
});

// UPDATE A POST BASED ON THE ID
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
           {_id: req.params.postId},
           {$set: {title : req.body.title}} 
        );
        res.json(updatedPost);

    }catch(err){
        res.json(err)
    }
})

// DELETE A SPECIFIC POST
router.delete('/:postId', async (req, res) =>{
    try{
       const deletedPost = await Post.remove({
            _id: req.params.postId
        });
        
        res.json(deletedPost);

    }catch(err){
        res.json({message:err})
    }
})

module.exports = { router };


