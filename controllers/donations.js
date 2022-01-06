const donationsService = require('../services/donations');

const renderDonations = (req, res, next) => {
  try {
    res.status(200).render('donations');
  } catch (e) {
    next(e);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const response = await donationsService.createOrder(params);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const captureOrder = async (req, res, next) => {
  try {
    await donationsService.captureOrder;
    res.status(200).render('payed');
  } catch (e) {
    next(e);
  }
};

const cancelOrder = (req, res, next) => {
  try {
    res.status(200).render('donations');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  renderDonations,
  createOrder,
  captureOrder,
  cancelOrder
};
