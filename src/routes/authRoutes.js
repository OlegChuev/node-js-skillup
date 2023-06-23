const express = require('express')

const userValidator = require('../validation/userValidation')
const authController = require('../controllers/authController')

const router = express.Router()

router
    .post('/sign_in', userValidator.auth, authController.signIn)
    .post('/sign_up', userValidator.signIn, authController.signUp)

module.exports = router
