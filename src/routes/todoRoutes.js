const express = require('express')

const todoValidator = require('../validation/todoValidation')
const todoController = require('../controllers/todoController')

const router = express.Router()

const verifyJWT = require('../middleware/verifyJWT')

router
    .get('/', verifyJWT, todoController.list)
    .get('/:id', verifyJWT, todoValidator.get, todoController.get)
    .post('/', verifyJWT, todoValidator.post, todoController.post)
    .delete('/:id', verifyJWT, todoValidator.destroy, todoController.destroy)
    .put('/', verifyJWT, todoValidator.put, todoController.update)
    .get('/random/seed', verifyJWT, todoController.seed)
    .get('/random/activity', verifyJWT, todoController.createRandom)
    .post('/:id/share', verifyJWT, todoValidator.share, todoController.share)
    .post(
        '/:id/change_ownership',
        verifyJWT,
        todoValidator.changeOwnership,
        todoController.changeOwnership
    )
    .post(
        '/search_by_text',
        verifyJWT,
        todoValidator.searchByText,
        todoController.searchByText
    )
    .post(
        '/search_in_radius',
        verifyJWT,
        todoValidator.searchInRadius,
        todoController.searchInRadius
    )

module.exports = router
