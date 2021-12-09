const pageValidation = async (req, res, next) => {
  const page = req.query.page;

  if (page === '') return res.status(400).json({ error: 'You must provide a page number.' });
  if (!page) return next();
  if (isNaN(page)) return res.status(400).json({ error: 'The page parameter must be a number.' });
  if (Number((page) < 1)) return res.status(400).json({ error: 'The page must be greater than one.' });
  next();
};

module.exports = {
  pageValidation
};
