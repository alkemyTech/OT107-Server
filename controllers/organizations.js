const organizationService = require('../services/organizations');

const getAll = async (req, res, next) => {
  try {
    const data = await organizationService.getAll();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll
};
