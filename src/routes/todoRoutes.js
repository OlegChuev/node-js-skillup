const express = require('express')

const todoValidator = require('../validation/todoValidation')
const todoController = require('../controllers/todoController')

const router = express.Router()

const verifyJWT = require('../middleware/verifyJWT')
const verifyAbility = require('../middleware/auth')

router
    .get('/', verifyJWT, verifyAbility, todoController.list)
    .get(
        '/:id',
        verifyJWT,
        verifyAbility,
        todoValidator.get,
        todoController.get
    )
    .post(
        '/',
        verifyJWT,
        verifyAbility,
        todoValidator.post,
        todoController.post
    )
    .delete(
        '/:id',
        verifyJWT,
        verifyAbility,
        todoValidator.destroy,
        todoController.destroy
    )
    .put(
        '/',
        verifyJWT,
        verifyAbility,
        todoValidator.put,
        todoController.update
    )
    .get('/random/seed', verifyJWT, verifyAbility, todoController.seed)
    .get(
        '/random/activity',
        verifyJWT,
        verifyAbility,
        todoController.createRandom
    )
    .post(
        '/:id/share',
        verifyJWT,
        verifyAbility,
        todoValidator.share,
        todoController.share
    )
    .post(
        '/:id/change_ownership',
        verifyJWT,
        verifyAbility,
        todoValidator.changeOwnership,
        todoController.changeOwnership
    )
    .post(
        '/search_by_text',
        verifyJWT,
        verifyAbility,
        todoValidator.searchByText,
        todoController.searchByText
    )
    .post(
        '/search_in_radius',
        verifyJWT,
        verifyAbility,
        todoValidator.searchInRadius,
        todoController.searchInRadius
    )

module.exports = router
