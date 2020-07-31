const express = require('express')
const router = express.Router()
const deptCtrl = require('../controllers/departments')
const prodCtrl = require('../controllers/products')
const userCtrl = require('../controllers/User')

router.get('/', (req, res) => {
    res.render('home')
})

// Department Sub Pages
// deptCtrl -- Sam's Section


// Product Sub Pages
// prodCtrl -- Alex's Section


// Comment Sub Pages
// commentCtrl -- Alex's Section


// User Sub Pages
// userCtrl -- Alex's Section



module.exports = router