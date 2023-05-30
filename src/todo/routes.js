const express = require('express')

import {
    listTodo,
    getTodo,
    postTodo,
    seedTodos,
    destroyTodo,
    updateTodo
} from './controllers/todo_controller'

const router = express.Router()

router.get('/', listTodo)
router.get('/:id', getTodo)
router.post('/', postTodo)
router.delete('/:id', destroyTodo)
router.get('/seed', seedTodos)
router.patch('/', updateTodo)

module.exports = router
