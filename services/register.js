const registerRepository = require('../repositories/register');

const register = async (body) => {
  const data = await registerRepository.register(body);
  return data;
};

module.exports = {
  register
};
