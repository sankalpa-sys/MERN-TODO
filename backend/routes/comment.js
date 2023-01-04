const Comment = require('../models/Comment')
const router = require("express").Router()




router.post('/',async(req, res)=>{
    const newComment = new Comment({
        comment: req.body.comment,
        email: req.body.email,
        todo: req.body.todo
    })

    try {
        const savedComment = await newComment.save() 
        res.status(200).send(savedComment)
    } catch (error) {
        res.status(400).send(error)
    }
})


// get all comment of a user and the post


router.get('/:todo/:email', async(req, res)=>{
   try {
    const comments = await Comment.find({todo: req.params.todo, email:req.params.email}).sort({createdAt: -1})
    res.status(200).send(comments)
   } catch (error) {
    res.status(400).send(error)
   }
})



router.delete('/:id', async(req, res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).send("Comment removed!")
    } catch(err){
        res.status(400).send(err)
    }
})


router.patch("/:id", async(req, res)=>{
    try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set: req.body, new: true})
      res.status(200).send(updatedComment)
    } catch (error) {
        res.status(400).send(err)
    }
})



module.exports = router