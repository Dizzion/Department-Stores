// Alex's Section
const Depts = require('../modules/departments')
const Product = require('../modules/products')

// export all functionality to router
module.exports = {
    indexDepts,
    showDepts,
    newDepts,
    addDepts,
    deleteDepts,
    editDepts,
    updateDepts
}
// dept index render
function indexDepts(req, res) {
    Depts.find({}, (err, allDepts) => {
        res.render('Departments/index', {
            Dept: allDepts
        })
    })
}
// show dept indivdualy
function showDepts(req, res) {
    Depts.findById(req.params.id)
        .populate({ path: 'products' })
        .exec((err, foundDept) => {
            if (err) {
                res.send(err)
            } else {
                res.render('Departments/show', {
                    Dept: foundDept
                })
            }
        })
}
// render the page to add a new dept
function newDepts(req, res) {
    if (req.session.loggedIn) {
        res.render('Departments/new')
    } else {
        res.redirect('/Users')
    }
}
//  add a new dept to the database
function addDepts(req, res) {
    Depts.create(req.body, (err, addedDept) => {
        res.redirect('/Depts')
    })
}
// delete a dept from the database
function deleteDepts(req, res) {
    if (req.session.loggedIn) {
        Depts.findByIdAndRemove(req.params.id, (err, deletedDept) => {
            if (err) {
                res.send(err)
            } else {
                Product.deleteMany({
                    _id: {
                        $in: deletedDept.products
                    }
                }, (err, data) => {
                    res.redirect('/Depts')
                })
            }
        })
    } else {
        res.redirect('/Users')
    }
}
// edit a Dept in the database
function editDepts(req, res) {
    if (req.session.loggedIn) {
        Depts.findById(req.params.id, (err, foundDept) => {
            res.render(
                'Departments/edit',
                {
                    Dept: foundDept
                }
            )
        })
    } else {
        res.redirect('/Users')
    }
}
// update a Dept in the database from the updated info
function updateDepts(req, res) {
    Depts.findByIdAndUpdate(req.params.id, req.body, (err, updatedDept) => {
        res.redirect('/Depts')
    })
}