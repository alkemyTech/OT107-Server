const express = require('express');

const router = express.Router();

const activitiesController = require('../controllers/activities');


//const usersMiddleware = require('../middleware/auth');

router.get('/',/*usersMiddleware.isAdmin,*/ activitiesController.getAll);

module.exports = router;
