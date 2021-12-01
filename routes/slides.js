const express = require('express');
const slidesControllers = require('../controllers/slides');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware.isAdmin, slidesControllers);

module.exports = router;