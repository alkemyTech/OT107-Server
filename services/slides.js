const slidesRepository = require('../repositories/slides');
const config = require('../config/config');
const s3 = require('../modules/aws/s3');

const getAll = async () => {
  const slides = await slidesRepository.getAll();
  return slides;
};

const getById = async (id) => {
  const slide = await slidesRepository.getById(id);
  if (!slide) throw new Error('slide no exist');
  return slide;
};

const create = async (image, body) => {
  const uploadImage = await s3.uploadToBucket(image);

  const nextOrder = await slidesRepository.getLastOrder() + 1;

  const newSlide = {
    imageUrl: uploadImage.Location,
    text: body.text,
    order: body.order || nextOrder,
    organizationId: config.idOrganization
  };

  const slide = await slidesRepository.create(newSlide);
  return slide;
};

const remove = async (id) => {
  const slide = await slidesRepository.remove(id);
  if (!slide) throw new Error('slide no exist');
  return slide;
};

module.exports = {
  getAll,
  getById,
  create,
  remove
};
