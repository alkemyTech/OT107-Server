const testimonialsRepo = require('../repositories/testimonials');
const paginationModule = require('../modules/paginationModule');

const limit = 10;

const getAll = async (page, protocol, host, baseUrl) => {
  const countTestimonials = await testimonialsRepo.count();
  if (!countTestimonials) {
    return { info: '0 row returned.' };
  }

  const pagination = paginationModule.pagination(
    limit,
    countTestimonials,
    {
      page,
      protocol,
      host,
      baseUrl
    },
  );
  const testimonials = await testimonialsRepo.getPages(
    limit,
    pagination.offset
  );

  const response = {
    count: countTestimonials,
    lastPage: pagination.lastPage,
    previousPage: pagination.previousPageUrl,
    nextPage: pagination.nextPageUrl,
    data: testimonials
  };
  return response;
};

const getById = async (params) => {
  const { id } = params;
  const data = await testimonialsRepo.getById(id);
  if (!data) {
    const error = new Error('Testimonial not found');
    error.status = 404;
    throw error;
  }
  return data;
};

const create = async (body) => {
  const data = await testimonialsRepo.create(body);
  return data;
};

const update = async (params, body) => {
  const { id } = params;
  const data = await testimonialsRepo.update(id, body);
  return data;
};

const remove = async (params) => {
  const { id } = params;
  const data = await testimonialsRepo.remove(id);
  if (!data) {
    const error = new Error('Testimonial not found');
    error.status = 404;
    throw error;
  }
  return data;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
