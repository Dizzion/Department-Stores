// Alex's Section
const mongoose = require('mongoose')
// create product Schema
const prodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    price: {type: String, required: true},
    inStock: Boolean,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
})

const Product = mongoose.model('Products', prodSchema)

module.exports = Product