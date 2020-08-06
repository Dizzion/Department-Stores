const User = require("../modules/User")
const passport = require('passport')

module.exports = {
    login,
    logout
}

function login(req, res) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/Users',
        failureFlash: true
    })
    User.findOne({ 'username': req.body.username }, (err, foundUser) => {
        if (foundUser !== null) {
            req.session.user = foundUser._id
            req.session.loggedIn = true
            res.redirect('/')
        } else {
            res.render('User/index', {
                error: 'Username Not Found (carefull it is case sensitive)'
            })
        }
    })
}

function logout(req, res) {
    req.logout()
    req.flash('sucess_msg', 'You are logged out')
    req.session.destroy()
    res.redirect('/')
}