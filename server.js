const express = require('express')
const app = express()
require('./db/db')
require('dotenv').config()
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const storeRouter = require('./routes/store')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)

require('./config/passport')(passport)

// middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET || 'zV;$0Adh:aoQ]wCBZJY).?xSL@=Vr/>&tS5c7X/UV~W]gJ%[zk6$&4%9jW7cn?{',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection,
                            ttl: 1 * 24 * 60 * 60})
}))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
app.use(express.static('./' + '/public'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/Store', storeRouter)


// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Up and Ready to Shop')
})

module.exports = app