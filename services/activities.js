const activitiesRepository = require('../repositories/activities');

const getAll = async () => {
  const activities = await activitiesRepository.getAll();
  return activities;
};

const create = async (body) => {
  const activities = await activitiesRepository.create(body);
  return activities;
};

module.exports = {
  getAll,
  create
};
