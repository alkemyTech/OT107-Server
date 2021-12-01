const testimonialsService = require('../services/testimonials');

const getAll = async(req, res, next) => {
  try {
    const data = await testimonialsService.getAll();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await testimonialsService.getById(id);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, image, content } = req.body;
  try {
    const data = await testimonialsService.create(name, image, content);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, content } = req.body;

  try {
    const testimonialId = await testimonialsService.getById(id);
    if (!testimonialId) return res.status(400).json({ error: 'That testimonial does not exist' });
    await testimonialsService.update(id, name, image, content);
    res.status(200).json({ message: 'The testimonial has been updated' });
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
