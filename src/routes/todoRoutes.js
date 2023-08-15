const express = require('express')

const todoValidator = require('../validation/todoValidation')
const todoController = require('../controllers/todoController')

const router = express.Router()

const verifyJWT = require('../middleware/verifyJWT')
const verifyAbility = require('../middleware/auth')
const verifySubscription = require('../middleware/verifySubscription')
const verifyAccess = require('../middleware/verifyAccess')

router
    .get(
        '/',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoController.list
    )
    .get(
        '/:id',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.get,
        todoController.get
    )
    .post(
        '/',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.post,
        todoController.post
    )
    .delete(
        '/:id',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.destroy,
        todoController.destroy
    )
    .put(
        '/',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.put,
        todoController.update
    )
    .get(
        '/random/seed',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoController.seed
    )
    .get(
        '/random/activity',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoController.createRandom
    )
    .post(
        '/:id/share',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.share,
        todoController.share
    )
    .post(
        '/:id/change_ownership',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.changeOwnership,
        todoController.changeOwnership
    )
    .post(
        '/search_by_text',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.searchByText,
        todoController.searchByText
    )
    .post(
        '/search_in_radius',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.searchInRadius,
        todoController.searchInRadius
    )
    .post(
        '/:id/check_coordinates',
        verifyJWT,
        verifyAccess,
        verifySubscription,
        verifyAbility,
        todoValidator.checkCoordinates,
        todoController.checkCoordinates
    )

module.exports = router
