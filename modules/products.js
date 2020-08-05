// Alex's Section
const mongoose = require('mongoose')
// create product Schema
const prodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    price: {type: String, required: true},
    img: String,
    inStock: Boolean,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
})

const Products = mongoose.model('Products', prodSchema)

module.exports = Products