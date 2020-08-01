const express = require('express')
const router = express.Router()
const deptCtrl = require('../controllers/departments')
const prodCtrl = require('../controllers/products')
const userCtrl = require('../controllers/User')
const commCtrl = require('../controllers/comments')

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

// Product Sub Pages  ||  Comment Routes within
// prodCtrl -- Alex's Section
router.get('/Products/', prodCtrl.indexProds,)
router.get('/Products/new', prodCtrl.newProds)
router.get('/Products/:id', prodCtrl.showProds, commCtrl.indexComms, commCtrl.editComms)
router.get('/Products/:id/edit', prodCtrl.editProds)
router.post('/Products/', prodCtrl.addProds)
router.post('/Products/:id', commCtrl.addComms)
router.delete('/Products/:id', prodCtrl.deleteProds, commCtrl.deleteComms)
router.put('/Products/:id', prodCtrl.updateProds, commCtrl.updateComms)



// User Sub Pages
// userCtrl -- Alex's Section



module.exports = router