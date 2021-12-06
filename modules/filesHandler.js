const path = require('path');

const isImage = (filename) => {
  const extension = (path.extname(filename)).toLowerCase();

  const validImageExtensions = [
    '.jpg',
    '.jpeg',
    '.png'
  ];
  if (!validImageExtensions.includes(extension)) {
    throw new Error('Invalid image extension');
  }

  return true;
};

module.exports = {
  isImage
};
