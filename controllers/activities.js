const activitiesService = require('../services/activities');

const getAll = async (req, res, next) => {
  try {
    const activities = await activitiesService.getAll();
    res.status(200).json(activities);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll
};
