// // Alex's Section
const Comments = require('../modules/comments')
const Products = require('../modules/products')

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
                foundProduct.comments.push(addedComment)
                foundProduct.save((err, addedComment) => {
                    res.redirect('/Store/Products/' + req.params.id)
                })
            })
        }
    })
}

// Delete Comment from Product show pages
function deleteComms(req, res) {
    if (req.session.loggedIn) {
        Comments.findByIdAndDelete(req.body.commentId, (err, data) => {
            Products.findOne({ 'comments': req.params.id }, (err, foundProduct) => {
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