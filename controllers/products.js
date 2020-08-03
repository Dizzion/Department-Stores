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
    Depts.findOne({'products': req.params.id})
        .populate(
            {
                path: 'products',
                match: {_id: req.params.id}
            })
        .exec((err, foundDept) => {
            if (err) {
                res.send(err)
            } else {
                res.render('Products/show', {
                    dept: foundDept,
                    products: foundDept.products[0]
                })
            }
        })
}
// render the page to add a new Product
function newProds(req, res) {
    Depts.find({}, (err, allDepts) => {
        res.render('Products/new', {
            depts: allDepts
        })
    })
}
//  add a new Product to the database
function addProds(req, res) {
    if (req.body.inStock === 'on') {
        req.body.inStock = true
    } else {
        req.body.inStock = false
    }
    Products.create(req.body, (err, addedProduct) => {
        if(err) {
            res.send(err);
        } else {
            Dept.findById(req.body.deptId, (err, foundDept) => {
                foundDept.Products.push(addedProduct)
                foundDept.save((err, addedProduct) => {
                    res.redirect('/Store/Products')
                })
            })
        }
    })
}
// delete a Product from the database
function deleteProds(req, res) {
    Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
        if(err) {
            res.send(err)
        } else {
            Comments.remove({
                _id: {
                    $in: deletedProd.comments
                }
            }, (err, data) => {
                res.redirect('/Store/Depts')
            })
        }
    })
}
// edit a Product in the database
function editProds(req, res) {
    Depts.find({}, (err, allDepts) => {
        Depts.findOne({'products': req.params.id})
        .populate({path: 'products', match: {_id: req.params.id}})
        .exec((err, foundProductDept) => {
            if(err) {
                res.send(err)
            }else {
                res.render('Products/edit', {
                    products: foundProductDept.Products[0],
                    depts: allDepts,
                    ProductDept: foundProductDept
                })
            }
        })
    })
}
// update a Product in the database from the updated info
function updateProds(req, res) {
    Products.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProduct) => {
        Depts.findOne({'products': req.params.id}, (err, foundDept) => {
            if(foundDept._id.toString() !== req.body.deptId) {
                foundDept.Products.deleteOne(req.params.id)
                foundDept.save((err, savedFoundDept) => {
                    Dept.findById(req.body.deptId, (err, newDept) => {
                        newDept.Products.push(updatedProduct)
                        newDept.save((err, savedNewDept) => {
                            res.redirect('/Store/Products')
                        })
                    })
                })
            } else {
                res.redirect('/Store/Products/' + req.params.id)
            }
        })
    })
}