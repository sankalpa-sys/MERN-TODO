const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const todoPath = require("./routes/todo")
const commentPath = require("./routes/comment")
const reactionPath= require("./routes/reaction")




const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/todo",todoPath)
app.use("/api/comment",commentPath)
app.use("/api/reaction",reactionPath)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})
app.listen(process.env.PORT || 8001, ()=>{
    console.log(`App listening on port ${8001}....`)
})