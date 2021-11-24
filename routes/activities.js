const express = require('express');

const router = express.Router();

const activitiesController = require('../controllers/activities');


const users = require('../middleware/users');

router.get('/', users.admin, activitiesController.getAll);

module.exports = router;
