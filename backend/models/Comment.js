const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    comment: {type: String, required: true},
    email: {type:String, required: true},
    todo:{type: String,  required: true},
    reaction:{type: String},
    
    
},{timestamps: true})





module.exports = mongoose.model("Comment", commentSchema)