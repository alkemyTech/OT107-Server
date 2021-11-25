const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.isAdmin ,contactsController.getAll);

module.exports = router;