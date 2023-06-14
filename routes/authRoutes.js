import { signIn, signUp } from '../controllers/authController'

const express = require('express')

const router = express.Router()
const { celebrate, Joi } = require('celebrate')

router
    .post(
        '/sign_in',
        celebrate({
            body: Joi.object({
                username: Joi.string().required().min(4).max(16),
                password: Joi.string().required().min(4).max(16)
            })
        }),
        signIn
    )
    .post(
        '/sign_up',
        celebrate({
            body: Joi.object({
                username: Joi.string().required().min(4).max(16),
                password: Joi.string().required().min(4).max(16)
            })
        }),
        signUp
    )

module.exports = router