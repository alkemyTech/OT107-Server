
const express = require('express')
const router = express.Router()

const categoriesRoutes = require('./categories')
router.use('/categories', categoriesRoutes)


module.exports = router;