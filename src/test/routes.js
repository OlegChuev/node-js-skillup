const express = require('express')

const router = express.Router()

router.get('/api/v1/ping', (req, res) => {
    res.json({ user: 'pong' })
})

module.exports = router
