// Alex's Section
const mongoose = require('mongoose')
// create Department Schema
const deptSchema = new mongoose.Schema({
    name: {type: String, required: true},
    productType: {type: String, required: true},
    img: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }]
})

const Depts = mongoose.model('Departments', deptSchema)

module.exports = Depts