// Alex's Section
const mongoose = require('mongoose')
// create User Schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users