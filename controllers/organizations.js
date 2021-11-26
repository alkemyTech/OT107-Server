const organizationService = require('../services/organizations');
const configuration = require('../config/config');

const getOrganizationPublic = async (req, res, next) => {
  try {
    const data = await organizationService.getOrganizationPublic(configuration.idOrganization);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getOrganizationPublic
};
