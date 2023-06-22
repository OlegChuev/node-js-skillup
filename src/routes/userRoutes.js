const express = require('express')

const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const userController = require('../controllers/userController')

router.get('/', verifyJWT, userController.list)

module.exports = router
