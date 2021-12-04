const activitiesRepository = require('../repositories/activities');

const getAll = async () => {
  const activities = await activitiesRepository.getAll();
  return activities;
};

const create = async (body) => {
  const activities = await activitiesRepository.create(body);
  return activities;
};

const getById = async (params) => {
  const id = params.id;
  const activity = await activitiesRepository.getById(id);
  if (!activity) {
    const error = new Error('The activity does not exist.');
    throw error;
  }
  return activity;
};

const update = async (params, body) => {
  const id = params.id;
  const activity = await activitiesRepository.update(id, body);
  return activity;
};

module.exports = {
  getAll,
  getById,
  create,
  update
};
