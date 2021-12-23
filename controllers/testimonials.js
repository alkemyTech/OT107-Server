const testimonialsService = require('../services/testimonials');

const getAll = async (req, res, next) => {
  try {
    const data = await testimonialsService.getAll(req.query.page || 1, req.protocol, req.get('host'), req.baseUrl);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await testimonialsService.getById(req.params);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const data = await testimonialsService.create(req.body);
    res.status(200).json({
      message: 'Testimonial has been created',
      id: data.id,
      name: data.name,
      image: data.image,
      content: data.content
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    await testimonialsService.update(req.params, req.body);
    const data = await testimonialsService.getById(req.params);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await testimonialsService.remove(req.params);
    res.status(200).json('Testimonial has been removed');
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