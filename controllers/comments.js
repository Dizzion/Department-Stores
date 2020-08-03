// Alex's Section
const Comments = require('../modules/comments')
const Products = require('../modules/products')
const commentForm

// export all functionality to router
module.exports = {
    indexComms,
    addComms,
    deleteComms,
    editComms,
    updateComms
}

// All Comments rendered with show Product
function indexComms(req, res) {
    Products.findById(req.params.id)
        .populate({path: 'comments'})
        .exec((err, foundProduct) => {
         if (err) {
                res.send(err)
            } else {
                res.render('Products/show', {
                    comments: foundProduct.comments
                })
            }
        })
}

// Add New Comment to the Product show page
function addComms(req, res) {
    Comments.create(req.body.comment, (err, addedComment) => {
        if(err) {
            res.send(err);
        } else {
            Products.findById(req.params.id, (err, foundProduct) => {
                foundProduct.comments.push(addedComment)
                foundProduct.save((err, addedComment) => {
                    res.redirect('/Store/Products/' + req.params.id)
                    commentForm = document.querySelector('#'+addedComment._id)
                    commentForm.setAttribute('readonly')
                })
            })
        }
    })
}

// Delete Comment from Product show pages
function deleteComms(req, res) {
    Comments.findByIdAndDelete(req.body.commentId, (err, data) => {
        res.redirect('/Store/Products/' + req.params.id)
    })
}

// enable Editing on comments nest on forms on the page
function editComms(req, res) {
    Products.findOne({'comments': req.body.commentId})
        .populate(
            {
                path: 'comments',
                match: {_id: req.body.commentId}
            })
        .exec((err, foundProduct) => {
            if(err) {
                res.send(err)
            } else {
                // make form no longer read only
                commentForm = document.querySelector('#'+req.body.commentId)
                commentForm.removeAttribute('readonly')
            }
        })
}

// update and turn Comment Form Ready Only
function updateComms(req, res) {
    Comments.findByIdAndUpdate(
        req.body.commentId, req.body.title, req.body.commentbody,
        (err, updatedCom) => {
            commentForm = document.querySelector('#' + updatedCom._id)
            commentForm.setAttribute('readonly')
    })
}