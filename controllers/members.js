const membersService = require('../services/members');

const getAll = async (req, res, next) => {
  try {
    const members = await membersService.getAll();
    res.status(200).json(members);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const members = await membersService.create(req.body);
    res.status(200).json(members);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const member = await membersService.getById(req.params.id);

    if (!member) { res.status(400).send('Not matching member'); }

    await membersService.remove(req.params.id);
    res.status(200).json('The member was removed succesfully');
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const member = await membersService.update(req.params.id, req.body);
    res.status(200).json(member);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  create,
  remove,
  update
};
