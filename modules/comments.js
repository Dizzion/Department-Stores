// Alex's Section
const mongoose = require('mongoose')
// create Comments Schema
const commentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true}
})

const Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments