// eslint-disable-next-line import/no-import-module-exports
import { listUsers } from '../controllers/userController'

const express = require('express')

const router = express.Router()

router.get('/', listUsers)

module.exports = router
