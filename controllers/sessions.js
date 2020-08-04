const express = require('express')
const User = require("../modules/User")

module.exports = {
    login,
    logout
}

function login(req, res) {
    User.find({ 'username': req.body.username }, (err, foundUser) => {
        if (req.body.password !== foundUser.password) {
            res.redirect('/Store')
        } else {
            req.session.username = req.body.username
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