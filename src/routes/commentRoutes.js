const express = require('express')

const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const verifySubscription = require('../middleware/verifySubscription')
const verifyAccess = require('../middleware/verifyAccess')

const todoValidator = require('../validation/commentValidation')
const commentController = require('../controllers/commentController')

router.get(
    '/:id',
    verifyJWT,
    verifyAccess,
    verifySubscription,
    todoValidator.get,
    commentController.listComments
)

router.post(
    '/',
    verifyJWT,
    verifyAccess,
    verifySubscription,
    todoValidator.post,
    commentController.createComment
)

module.exports = router
