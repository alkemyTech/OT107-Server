const activitesService = require('../services/activities');

const getAll = async (req, res, next) => {
  try {
    const activities = await activitesService.getAll();
    res.status(200).json({ data: activities });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll
};
