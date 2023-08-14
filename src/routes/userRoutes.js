const express = require('express')

const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const verifySubscription = require('../middleware/verifySubscription')
const verifyAccess = require('../middleware/verifyAccess')

const userController = require('../controllers/userController')

router.get(
    '/',
    verifyJWT,
    verifyAccess,
    verifySubscription,
    userController.list
)

router.get(
    '/profile/',
    verifyJWT,
    verifyAccess,
    userController.getProfile
)

module.exports = router
