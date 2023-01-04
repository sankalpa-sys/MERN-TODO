const mongoose = require("mongoose")


const reactionSchema = new mongoose.Schema({
    reaction: {type: String, required: true},
    comment:{type: String, required: true}
   
}, {timestamps: true})


module.exports = mongoose.model("Reaction", reactionSchema)