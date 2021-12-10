const pagination = (limit, count, req) => {
  const lastPage = Math.ceil(count / limit);
  const page = Number(req.page);
  let previousPageUrl = null;
  let nextPageUrl = null;

  if (page > lastPage) {
    const error = new Error(`The requested page is greater than the last page. [1-${lastPage}]`);
    error.status = 400;
    throw error;
  }
  const urlBase = `${req.protocol}://${req.host}${req.baseUrl}`;

  if (page > 1) {
    previousPageUrl = `${urlBase}?page=${page - 1}`;
  }
  if (page !== lastPage) {
    nextPageUrl = `${urlBase}?page=${page + 1}`;
  }
  const offset = (page - 1) * limit;

  const paginationData = {
    lastPage,
    offset,
    previousPageUrl,
    nextPageUrl
  };

  return paginationData;
};

module.exports = {
  pagination
};
