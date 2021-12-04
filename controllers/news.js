const newsService = require('../services/news');

const getAll = async (req, res, next) => {
  try {
    const news = await newsService.getAll();

    res.status(200).json(news);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const novelty = await newsService.create(data);

    res.status(200).json(novelty);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const novelty = await newsService.getById(id);

    res.status(200).json(novelty);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const novelty = await newsService.update(id, body);

    res.status(200).json(novelty);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await newsService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
