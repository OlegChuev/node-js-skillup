const express = require('express')

const router = express.Router()

const bodyParser = require('body-parser')

const paymentController = require('../controllers/paymentController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyAccess = require('../middleware/verifyAccess')

router.post(
    '/create_subscription',
    verifyJWT,
    verifyAccess,
    paymentController.createSubscription
)
router.post(
    '/webhook',
    bodyParser.raw({ type: 'application/json' }),
    paymentController.webhook
)

module.exports = router
