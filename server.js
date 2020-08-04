const express = require('express')
const app = express()
require('./db/db')
const session = require('express-session')
const bodyParser = require('body-parser')
const storeRouter = require('./routes/store')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')


// middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts);
app.use(session({
    secret: "ShhItsSecretGuys",
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./' + '/public'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/Store', storeRouter)


// listen on port 3000
app.listen(3000, () => {
    console.log('Up and Ready to Shop')
})

module.exports = app