/* eslint-disable no-param-reassign */
const newsRepository = require('../repositories/news');
const categoriesRepository = require('../repositories/categories');
const paginationModule = require('../modules/paginationModule');
const s3 = require('../modules/aws/s3');

const limit = 10;

const getAll = async (page, protocol, host, baseUrl) => {
  const countNews = await newsRepository.count();
  if (!countNews) {
    return { info: '0 row returned.' };
  }
  const pagination = paginationModule.pagination(
    limit,
    countNews,
    {
      page, protocol, host, baseUrl
    },
  );
  const news = await newsRepository.getPages(
    limit,
    pagination.offset
  );
  const response = {
    count: countNews,
    lastPage: pagination.lastPage,
    previousPage: pagination.previousPageUrl,
    nextPage: pagination.nextPageUrl,
    data: news
  };
  return response;
};

const create = async (data) => {
  const newsCategory = await categoriesRepository.getByName('news');
  const imageUploaded = await s3.uploadImage(data.image);
  data.categoryId = newsCategory.id;
  data.image = imageUploaded.Location;
  const novelty = await newsRepository.create(data);

  if (!novelty) {
    const error = new Error('Novelty not found');
    error.status = 404;
    throw error;
  }
  return novelty;
};

const getById = async (params) => {
  const { id } = params;
  const novelty = await newsRepository.getById(id);
  if (!novelty) {
    const error = new Error('Novelty not found');
    error.status = 404;
    throw error;
  }
  return novelty;
};

const update = async (params, data) => {
  const { id } = params;
  const existNovelty = await newsRepository.getById(id);
  if (!existNovelty) {
    const error = new Error('Novelty not found');
    error.status = 404;
    throw error;
  }

  if (data.categoryId) {
    const checkCategoryId = await categoriesRepository.getById(data.categoryId);
    if (!checkCategoryId) throw new Error('CategoryId does not exist');
  }

  const imageUploaded = await s3.uploadImage(data.image);
  data.image = imageUploaded.Location;

  const novelty = await newsRepository.update(id, data);
  return novelty;
};

const remove = async (id) => {
  const existNovelty = await newsRepository.getById(id);
  if (!existNovelty) {
    const error = new Error('Novelty not found');
    error.status = 404;
    throw error;
  }

  await newsRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
