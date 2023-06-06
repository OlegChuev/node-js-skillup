import {
    listTodo,
    getTodo,
    postTodo,
    seedTodos,
    destroyTodo,
    updateTodo,
    getRandomTodo
} from '../controllers/todoController'

const express = require('express')
const { celebrate, Joi } = require('celebrate')

const router = express.Router()

router
    .get('/', listTodo)
    .get(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        getTodo
    )
    .post(
        '/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                username: Joi.string().required(),
                isDone: Joi.boolean().required()
            })
        }),
        postTodo
    )
    .delete(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        destroyTodo
    )
    .put(
        '/',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                title: Joi.string().optional(),
                description: Joi.string().optional(),
                username: Joi.string().optional(),
                isDone: Joi.boolean().optional()
            })
        }),
        updateTodo
    )
    .get('/seed', seedTodos)
    .get('/random/activity', getRandomTodo)

module.exports = router
