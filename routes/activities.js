const express = require('express');

const router = express.Router();

const activitiesController = require('../controllers/activities');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.isAdmin, activitiesController.getAll);

module.exports = router;
