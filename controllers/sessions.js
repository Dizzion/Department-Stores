const User = require("../modules/User")

module.exports = {
    login,
    logout
}

function login(req, res) {
    User.findOne({ 'username': req.body.username }, (err, foundUser) => {
        if (req.body.password !== foundUser.password) {
            return res.send('<h1>Not a valid password or User Name</h1><br/><a href="/Store/Users">Back</a>')
        } else {
            req.session.username = foundUser.username
            req.session.user = foundUser._id
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