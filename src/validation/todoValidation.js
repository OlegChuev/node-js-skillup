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
        context: Joi.string().optional(),
        isPrivate: Joi.boolean().optional(),
        isDone: Joi.boolean().required(),
        location: {
            coordinates: Joi.array()
                .optional()
                .ordered(
                    Joi.number().required().min(-180).max(180),
                    Joi.number().required().min(-90).max(90)
                )
        }
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
        context: Joi.string().optional(),
        description: Joi.string().optional(),
        isDone: Joi.boolean().optional(),
        isPrivate: Joi.boolean().optional(),
        location: {
            coordinates: Joi.array()
                .optional()
                .ordered(
                    Joi.number().required().min(-180).max(180),
                    Joi.number().required().min(-90).max(90)
                )
        }
    })
})

export const share = celebrate({
    body: Joi.object({
        email: Joi.string().required().email()
    }),
    params: Joi.object({
        id: Joi.string().required()
    })
})

export const changeOwnership = celebrate({
    body: Joi.object({
        email: Joi.string().required().email()
    }),
    params: Joi.object({
        id: Joi.string().required()
    })
})

export const searchByText = celebrate({
    body: Joi.object({
        search_by: Joi.string().required()
    })
})

export const searchInRadius = celebrate({
    body: Joi.object({
        radius: Joi.number().required(),
        coordinates: Joi.array()
            .required()
            .ordered(
                Joi.number().required().min(-180).max(180),
                Joi.number().required().min(-90).max(90)
            )
    })
})
