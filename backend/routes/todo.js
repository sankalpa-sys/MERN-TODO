const Todo = require('../models/Todo')
const router = require("express").Router()


// add todo

router.post('/', async(req, res)=>{
    try {
        const newTodo = new Todo({
            title: req.body.title,
            desc: req.body.desc,
            done: req.body.done,
            priority: req.body.priority
        })
        const savedTodo = await newTodo.save()
        res.status(200).send(savedTodo)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete('/:id',async(req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).send("Task Deleted!")
    } catch (error) {
        res.status(400).send(error)
    }
})


router.put("/:id", async(req,res)=>{
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true} )
        res.status(200).send(updatedTodo)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/", async(req,res)=>{
    try {
        const todos = await Todo.find()
        res.status(200).send(todos)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/:id", async(req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).send(todo)
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports = router