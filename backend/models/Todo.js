const mongoose = require("mongoose")


const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String},
    done: {type: Boolean, default: false},
    priority: {type: Number, default: 4},
    category: {type: String, default:"personal"}
}, {timestamps: true})


module.exports = mongoose.model("Model", TodoSchema)