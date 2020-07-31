const express = require('express')
const router = express.Router()
const deptCtrl = require('../controllers/departments')
const prodCtrl = require('../controllers/products')
const userCtrl = require('../controllers/User')

router.get('/', (req, res) => {
    res.render('home')
})

// Department Sub Pages
// deptCtrl -- Alex's Section
router.get('/Depts/', deptCtrl.indexDepts)
router.get('/Depts/new', deptCtrl.newDepts)
router.get('/Depts/:id', deptCtrl.showDepts)
router.get('/Depts/:id/edit', deptCtrl.editDepts)
router.post('/Depts/', deptCtrl.addDepts)
router.delete('/Depts/:id', deptCtrl.deleteDepts)
router.put('/Depts/:id', deptCtrl.updateDepts)

// Product Sub Pages
// prodCtrl -- Alex's Section


// Comment Sub Pages
// commentCtrl -- Alex's Section


// User Sub Pages
// userCtrl -- Alex's Section



module.exports = router