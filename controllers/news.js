const newsService = require('../services/news');

const getAll = async (req, res, next) => {
  try {
    const news = await newsService.getAll(req.query.page || 1, req.protocol, req.get('host'), req.baseUrl);
    res.status(200).json(news);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const data = {...req.body , image:req.files.image}
    const novelty = await newsService.create(data);
    res.status(200).json(novelty);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const novelty = await newsService.getById(req.params);
    res.status(200).json(novelty);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const data = {...req.body , image:req.files.image}
    await newsService.update(req.params, data);
    const novelty = await newsService.getById(req.params);

    res.status(200).json(novelty);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await newsService.remove(id);

    res.status(200).json({ msg: 'News removed succesfully' });
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
