// Alex's Section
const User = require('../modules/User')
const Comments = require('../modules/comments')
const bcrypt = require('bcryptjs')

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
        return res.redirect('/Users/' + req.session.user)
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


    const { username, password, password2, email, name } = req.body
    let errors = []

    if (!username || !email || !password || !password2 || !name) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('User/new', {
            errors,
            username,
            email,
            password,
            password2,
            name
        });
    } else {
        User.findOne({ username: username }).then(user => {
            if (user) {
                errors.push({ msg: 'Username already exists' })
                res.render('User/new', {
                    errors,
                    username,
                    email,
                    password,
                    password2,
                    name
                })
            } else {
                const newUser = new User({
                    username,
                    password,
                    email,
                    name
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                )
                                res.redirect('/Users')
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
    }
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