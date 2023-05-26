const express = require('express')

const router = express.Router()

router.get('/main', (req, res) => {
    res.render('index', {
        info: 'asd',
        query_string: req.query.query_string,
    })
})

module.exports = router
