const activitiesService = require('../services/activities');

const getAll = async (req, res, next) => {
  try {
    const activities = await activitiesService.getAll();
    res.status(200).json(activities);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const activity = await activitiesService.create(req.body);
    res.status(200).json(
      activity
    );
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const activity = await activitiesService.getById(req.params);
    res.status(200).json(activity);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    await activitiesService.update(req.params, req.body);
    const activity = await activitiesService.getById(req.params);
    res.status(200).json(activity);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update
};
