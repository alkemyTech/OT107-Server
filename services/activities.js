const activitiesRepository = require('../repositories/activities');

const getAll = async () => {
  const activities = await activitiesRepository.getAll();
  return activities;
};

module.exports = {
  getAll
};
