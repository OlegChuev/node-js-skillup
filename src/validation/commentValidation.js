const { celebrate, Joi } = require('celebrate')

export const get = celebrate({
    params: Joi.object({
        id: Joi.string().required()
    })
})

export const post = celebrate({
    body: Joi.object({
        text: Joi.string().required(),
        todoId: Joi.string().required()
    })
})
