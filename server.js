const express = require('express')
const app = express()
require('./db/db')
const session = require('express-session')
const bodyParser = require('body-parser')
const storeRouter = require('./routes/store')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts');


// middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts);

app.use(session({
    secret: "ShhItsSecretGuys",
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./' + '/public'))
app.use('/Store', storeRouter)

// set view engine

// app.get('/', (req, res) => {
//     res.render('home')
// })

// listen on port 3000
app.listen(3000, () => {
    console.log('Up and Ready to Shop')
})

module.exports = app