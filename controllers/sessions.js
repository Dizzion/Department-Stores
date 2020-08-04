const express = require('express')
const User = require("../modules/User")

module.exports = {
    login,
    logout,

}

function login (req, res) {
    req.session.username = req.body.username
    req.session.loggedIn = true 
    res.redirect('/Store')
}

function logout (req, res) {
    req.session.destroy(err => {
        if (err) {
            res.redirect('/Store')
        } else {
            res.redirect('/Store')
        }
    })
}