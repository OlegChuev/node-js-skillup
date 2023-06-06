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

const router = express.Router()

router
    .get('/', listTodo)
    .get('/:id', getTodo)
    .post('/', postTodo)
    .delete('/:id', destroyTodo)
    .get('/seed', seedTodos)
    .put('/', updateTodo)
    .get('/random/todo', getRandomTodo)

module.exports = router
