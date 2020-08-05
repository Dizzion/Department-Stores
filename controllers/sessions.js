const User = require("../modules/User")

module.exports = {
    login,
    logout
}

function login(req, res) {
    User.findOne({ 'username': req.body.username }, (err, foundUser) => {
        if (req.body.password !== foundUser.password) {
            return res.redirect('/Store/Users')
        } else {
            req.session.username = foundUser.username
            req.session.loggedIn = true
            res.redirect('/Store')
        }
    })
}

function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            res.redirect('/Store')
        } else {
            res.redirect('/Store')
        }
    })
}