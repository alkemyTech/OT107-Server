const newsService = require('../services/news');

const getAll = async (req, res, next) => {
  try {
    const news = await newsService.getAll();

    if (!news) throw new Error('bad request');
    res.status(200).json(news);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const news = await newsService.create(data);

    if (!news) throw new Error('bad request');
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = id ? await newsService.getById(id) : null;

    if (!news) throw new Error('bad request');
    res.status(200).json(news);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const news = id ? await newsService.update(id, data) : null;

    if (!news) throw new Error('bad request');
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = id ? await newsService.remove(id) : null;

    if (!news) throw new Error('bad request');
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
