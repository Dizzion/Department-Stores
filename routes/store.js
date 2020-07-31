const express = require('express')
const router = express.Router()
const deptCtrl = require('../controllers/departments')
const prodCtrl = require('../controllers/products')
const userCtrl = require('../controllers/User')

router.get('/', (req, res) => {
    res.render('home')
})

// Department Sub Pages
// deptCtrl


// Product Sub Pages
// prodCtrl


// User Sub Pages
// userCtrl

module.exports = router