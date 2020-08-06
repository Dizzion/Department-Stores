// // Alex's Section
const Comments = require('../modules/comments')
const Products = require('../modules/products')
const User = require('../modules/User')

// export all functionality to router
module.exports = {
    addComms,
    deleteComms,
    editComms,
    updateComms
}

// Add New Comment to the Product show page
function addComms(req, res) {
    Comments.create(req.body, (err, addedComment) => {
        if (err) {
            res.send(err);
        } else {
            Products.findById(req.params.id, (err, foundProduct) => {
                if (req.session.user === undefined) {
                    foundProduct.comments.push(addedComment)
                    foundProduct.save((err, addedComment) => {
                        return res.redirect('/Store/Products/' + req.params.id)
                    })
                } else {
                    User.findById(req.session.user, (err, foundUser) => {
                        foundUser.comments.push(addedComment)
                        foundUser.save()
                        foundProduct.comments.push(addedComment)
                        foundProduct.save((err, addedComment) => {
                            res.redirect('/Store/Products/' + req.params.id)
                        })
                    })
                }
            })
        }
    })
}

// Delete Comment from Product show pages
function deleteComms(req, res) {
    if (req.session.loggedIn) {
        Comments.findByIdAndDelete(req.params.id, (err, data) => {
            Products.findOne({ 'comments': req.params.id }, (err, foundProduct) => {
                User.findOne({ 'comments': req.params.id }, (err, foundUser) => {
                    if (foundUser !== null) {
                        let pos = foundUser.comments.indexOf(req.params.id)
                        foundUser.comments.splice(pos, 1)
                        foundUser.save()
                    }
                })
                let pos = foundProduct.comments.indexOf(req.params.id)
                foundProduct.comments.splice(pos, 1)
                foundProduct.save()
                res.redirect('/Store/Products/' + foundProduct._id)
            })
        })
    } else {
        res.redirect('/Store/Users')
    }
}

// enable Editing on comments nest on forms on the page
function editComms(req, res) {
    if (req.session.loggedIn) {
        Products.find({}, (err, allProducts) => {
            Products.findOne({ 'comments': req.params.id })
                .populate({ path: 'comments', match: { _id: req.params.id } })
                .exec((err, foundCommentProd) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.render('Comments/edit', {
                            comment: foundCommentProd.comments[0]
                        })
                    }
                })
        })
    } else {
        res.redirect('/Store/Users')
    }
}

// update and turn Comment Form Ready Only
function updateComms(req, res) {
    Products.findOne({ 'comments': req.params.id }, (err, foundProduct) => {
        Comments.findByIdAndUpdate(req.params.id, req.body, () => {
            res.redirect('/Store/Products/' + foundProduct._id)
        })
    })
}