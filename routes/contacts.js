const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');
const authMiddleware = require('../middlewares/auth');

// Aca futuro POST /contacts OT107-56

module.exports = router;
