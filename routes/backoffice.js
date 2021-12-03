const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const contactsController = require('../controllers/contacts');

router.get('/contacts', authMiddleware.isAdmin, contactsController.getAll);

module.exports = router;
