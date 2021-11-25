const organizationService = require('../services/organizations');

const getOne = async (req, res, next) => {
  try {
    const data = await organizationService.getOne(1);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getOne
};
