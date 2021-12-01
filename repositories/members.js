const Models = require('../models');

const getAll = async () => {
  const data = await Models.Members.findAll();
  return data;
};


const createNew = async () => {

  await Models.Members.create(
    {
      name: req.body.name,
      facebookUrl: req.body.facebookUrl,
      instagramUrl: req.body.instagramUrl,
      linkedinUrl: req.body.linkedinUrl,
      image: req.file.originalname,
      description: req.body.description
    })
}

module.exports = {
  getAll,
  createNew
};
