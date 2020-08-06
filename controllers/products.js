// Alex's Section
const Products = require('../modules/products')
const Depts = require('../modules/departments')
const Comments = require('../modules/comments')

// export all functionality to router
module.exports = {
    indexProds,
    showProds,
    newProds,
    addProds,
    deleteProds,
    editProds,
    updateProds
}
// Product index render
function indexProds(req, res) {
    Products.find({}, (err, allProducts) => {
        res.render('Products/index', {
            products: allProducts
        })
    })
}
// show Product indivdualy
function showProds(req, res) {
    Depts.findOne({ 'products': req.params.id })
        .populate(
            {
                path: 'products',
                match: { _id: req.params.id }
            })
        .exec((err, foundDept) => {
            if (err) {
                res.send(err)
            } else {
                Products.findOne({ _id: foundDept.products[0]._id })
                    .populate({ path: 'comments' })
                    .exec((err, foundProduct) => {
                        res.render('Products/show', {
                            dept: foundDept,
                            products: foundProduct
                        })
                    })
            }
        })
}
// render the page to add a new Product
function newProds(req, res) {
    if (req.session.loggedIn) {
        Depts.find({}, (err, allDepts) => {
            res.render('Products/new', {
                depts: allDepts
            })
        })
    } else {
        res.redirect('/Users')
    }
}
//  add a new Product to the database
function addProds(req, res) {
    if (req.session.loggedIn) {
        if (req.body.inStock === 'on') {
            req.body.inStock = true
        } else {
            req.body.inStock = false
        }
        Products.create(req.body, (err, addedProduct) => {
            if (err) {
                res.send(err)
            } else {
                Depts.findById(req.body.deptId, (err, foundDept) => {
                    foundDept.products.push(addedProduct)
                    foundDept.save((err, addedProduct) => {
                        res.redirect('/Products')
                    })
                })
            }
        })
    } else {
        res.redirect('/Users')
    }
}
// delete a Product from the database
function deleteProds(req, res) {
    if (req.session.loggedIn) {
        Depts.findOne({ 'products': req.params.id }, (err, foundDept) => {
            let pos = foundDept.products.indexOf(req.params.id)
            foundDept.products.splice(pos, 1)
            foundDept.save()
        })
        Products.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
            if (err) {
                res.send(err)
            } else {
                Comments.deleteMany({
                    _id: {
                        $in: deletedProduct.comments
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
// edit a Product in the database
function editProds(req, res) {
    if (req.session.loggedIn) {
        Depts.find({}, (err, allDepts) => {
            Depts.findOne({ 'products': req.params.id })
                .populate({ path: 'products', match: { _id: req.params.id } })
                .exec((err, foundProductDept) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.render('Products/edit', {
                            products: foundProductDept.products[0],
                            depts: allDepts,
                            ProductDept: foundProductDept
                        })
                    }
                })
        })
    } else {
        res.redirect('/Users')
    }
}
// update a Product in the database from the updated info
function updateProds(req, res) {
    if (req.body.inStock === 'on') {
        req.body.inStock = true
    } else {
        req.body.inStock = false
    }
    Products.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProduct) => {
        Depts.findOne({ products: req.params.id }, (err, foundDept) => {
            if (foundDept._id.toString() !== req.body.deptId) {
                let pos = foundDept.products.indexOf(req.params.id)
                foundDept.products.splice(pos, 1)
                foundDept.save((err, savedFoundDept) => {
                    Depts.findById(req.body.deptId, (err, newDept) => {
                        newDept.products.push(updatedProduct)
                        newDept.save((err, savedNewDept) => {
                            res.redirect('/Products')
                        })
                    })
                })
            } else {
                res.redirect('/Products/' + req.params.id)
            }
        })
    })
}