const activity = require('../models/index').activities;

const getAll = async () => {
  const data = await activity.findAll();
  return data;
};

module.exports = {
  getAll
};
