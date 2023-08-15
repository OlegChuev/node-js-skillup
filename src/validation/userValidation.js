const { celebrate, Joi } = require('celebrate')

// eslint-disable-next-line import/prefer-default-export
export const auth = celebrate({
    body: Joi.object({
        username: Joi.string().required().min(4),
        password: Joi.string().required().min(4)
    })
})

export const signUp = celebrate({
    body: Joi.object({
        username: Joi.string().required().min(4),
        password: Joi.string().required().min(4),
        email: Joi.string().required().email(),
        country: Joi.string().required(),
        postal_code: Joi.string().required()
    })
})
