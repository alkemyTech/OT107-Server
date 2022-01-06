const express = require('express');
const donationsController = require('../controllers/donations');

const router = express.Router();

router.get('/', donationsController.renderDonations);
router.post('/create-order', donationsController.createOrder);
router.get('/capture-order', donationsController.captureOrder);
router.get('/cancel-order', donationsController.cancelOrder);

module.exports = router;
