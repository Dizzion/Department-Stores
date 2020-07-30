const express = require('express')
const app = express()
require('./db/db')
const bodyParser = require('body-parser')
const storeRouter = require('./routes/stores')
const methodOverride = require('method-override')

// middleware
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./' + '/public'))
app.use('/Stores', storesRouter)

// set view engine
app.set('view engine', 'ejs')

// listen on port 3000
app.listen(3000, () => {
    console.log('Up and Ready to Shop')
})

module.exports = app