// Alex's Section
const User = require('../modules/User')
const Comments = require('../modules/comments')

module.exports = {
    indexUser,
    showUser,
    newUser,
    addUser,
    editUser,
    updateUser
}

function indexUser(req, res) {
    if (req.session.loggedIn) {
        return res.redirect('/Store/Users/' + req.session.user)
    }
    res.render('User/index')
}

function showUser(req, res) {
    User.findById(req.params.id)
        .populate({ path: 'comments' })
        .exec((err, foundUser) => {
            if (err) {
                res.send(err)
            } else {
                res.render('User/show', {
                    user: foundUser
                })
            }
        })
}

function newUser(req, res) {
    res.render('User/new')
}

function addUser(req, res) {
    if (req.body.password !== req.body.password2) {
        return res.render('User/new', {
            errors: "Passwords Did Not Match"
        })
    }
    User.create(req.body, (err, addedUser) => {
        if (addedUser === undefined) {
            return res.render('User/new', {
                errors: "Username Already Exists"
            })
        } else {
            req.session.user = addedUser._id
            req.session.username = addedUser.username
            req.session.loggedIn = true
            res.redirect('/Store')
        }
    })
}

function editUser(req, res) {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('User/edit', {
            user: foundUser
        })
    })
}

function updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        res.redirect('/Store')
    })

}