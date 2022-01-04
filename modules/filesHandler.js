const path = require('path');

const isImage = (filename) => {
  const extension = (path.extname(filename)).toLowerCase();

  const validImageExtensions = [
    '.jpg',
    '.jpeg',
    '.png'
  ];
  if (!validImageExtensions.includes(extension)) {
    return false
  }

  return true;
};

module.exports = {
  isImage
};
