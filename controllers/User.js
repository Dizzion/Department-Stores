// Alex's Section
const User = require('../modules/User')
const Comments = require('../modules/comments')


module.exports = {
    indexUser,
    showUser,
    newUser,
    addUser,
    editUser,
    deleteUser,
    updateUser,
}

function indexUser (req, res) {
    User.find({}, (err, allUsers) => {
        res.render('User/index', {
            users: allUsers
        })
    })
}


function showUser (req, res) {
    User.findById(req.params.id)
    .populate({path: 'comments'})
    .exec((err, foundUser) => {
        if(err) {
            res.send(err)
        } else {
            res.render('User/show', {
                user: foundUser
            })
        }
    })
}

function newUser (req, res) {
    res.render('User/new')
}

function addUser (req, res) {
    User.create(req.body, (err, addedUser) => {
        res.redirect('/Store')
    })
}

function deleteUser (req, res) {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        if(err) {
            res.send(err)
        } else {
            Comments.deleteMany({
                _id: {
                    $in: deletedUser.comments
                }
            }, (err, data) => {
                res.render('/Store')
            })
        }
    })
}

function editUser (req, res) {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('User/edit', {
            user: foundUser
        })
    })
}

function updateUser (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        res.redirect('/Store')
    })
 
}