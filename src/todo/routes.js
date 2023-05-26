const express = require('express')

import {
    getTodo,
    postTodo,
    seedTodos,
    destroyTodo
} from './controllers/todo_controller'

const router = express.Router()

router.get('/', getTodo)
router.post('/', postTodo)
router.delete('/', destroyTodo)
router.get('/seed', seedTodos)

module.exports = router
