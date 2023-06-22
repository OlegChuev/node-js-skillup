const { celebrate, Joi } = require('celebrate')

export const get = celebrate({
    params: Joi.object({
        id: Joi.string().required()
    })
})

export const post = celebrate({
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        username: Joi.string().required(),
        isDone: Joi.boolean().required()
    })
})

export const destroy = celebrate({
    params: Joi.object({
        id: Joi.string().required()
    })
})

export const put = celebrate({
    body: Joi.object({
        id: Joi.string().required(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        username: Joi.string().optional(),
        isDone: Joi.boolean().optional()
    })
})
