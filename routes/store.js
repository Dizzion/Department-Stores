const express = require('express')
const router = express.Router()
const deptCtrl = require('../controllers/departments')
const prodCtrl = require('../controllers/products')
const userCtrl = require('../controllers/User')
const commCtrl = require('../controllers/comments')
const sessionCtrl = require('../controllers/sessions')


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
router.get('/Products/', prodCtrl.indexProds)
router.get('/Products/new', prodCtrl.newProds)
router.get('/Products/:id', prodCtrl.showProds)
router.post('/Products/:id', commCtrl.addComms)
router.get('/Products/:id/edit', prodCtrl.editProds)
router.post('/Products/', prodCtrl.addProds)
router.delete('/Products/:id', prodCtrl.deleteProds)
router.put('/Products/:id', prodCtrl.updateProds)
router.delete('/Comments/:id', commCtrl.deleteComms)
router.get('/Comments/:id/edit', commCtrl.editComms)
router.put('/Comments/:id', commCtrl.updateComms)

// User Sub Pages
// userCtrl -- Alex's Section
router.get('/Logout/', sessionCtrl.logout)
router.get('/Users/', userCtrl.indexUser)
router.post('/Users/', sessionCtrl.login)
router.get('/Users/new', userCtrl.newUser)
router.get('/Users/:id', userCtrl.showUser)
router.get('/Users/:id/edit', userCtrl.editUser)
router.post('/Login', userCtrl.addUser)
router.put('/Users/:id', userCtrl.updateUser)



module.exports = router