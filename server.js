const express = require('express')
const app = express()
require('./db/db')
import { secret } from "./db/db";
const session = require('express-session')
const bodyParser = require('body-parser')
const storeRouter = require('./routes/store')
const methodOverride = require('method-override')

// middleware
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./' + '/public'))
app.use('/Store', storeRouter)

// set view engine
app.set('view engine', 'ejs')

// listen on port 3000
app.listen(3000, () => {
    console.log('Up and Ready to Shop')
})

module.exports = app