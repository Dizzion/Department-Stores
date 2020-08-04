// // Alex's Section
const Comments = require('../modules/comments')
const Products = require('../modules/products')

// export all functionality to router
module.exports = {
    addComms,
    deleteComms,
    // editComms,
    // updateComms
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
    Comments.findByIdAndDelete(req.body.commentId, (err, data) => {
        Products.findOne({ 'comments': req.params.id}, (err, foundProduct) => {
            let pos = foundProduct.comments.indexOf(req.params.id)
            foundProduct.comments.splice(pos, 1)
            foundProduct.save()
            res.redirect('/Store/Products/' + foundProduct._id)
        })
    })
}

// // enable Editing on comments nest on forms on the page
// function editComms(req, res) {
//     Products.findOne({'comments': req.body.commentId})
//         .populate(
//             {
//                 path: 'comments',
//                 match: {_id: req.body.commentId}
//             })
//         .exec((err, foundProduct) => {
//             if(err) {
//                 res.send(err)
//             } else {
//             }
//         })
// }

// // update and turn Comment Form Ready Only
// function updateComms(req, res) {
//     Comments.findByIdAndUpdate(req.body.commentId, req.body.title, req.body.commentbody, (err, updatedCom))
// }