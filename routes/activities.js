const express = require('express');

const router = express.Router();

const activitiesController = require('../controllers/activities');
const authMiddleware = require('../middlewares/auth');
const activitiesMioddleware = require('../middlewares/activities');

router.get('/', authMiddleware.isAdmin, activitiesController.getAll);
router.post('/', authMiddleware.isAdmin, activitiesMioddleware.activitiesInputValidation, activitiesController.create);
router.put('/:id', authMiddleware.isAdmin, activitiesController.update);

module.exports = router;
