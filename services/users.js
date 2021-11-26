const usersRepo = require("../repositories/users");

const getAll = async () => {
  const data = await usersRepo.getAll();
  return data;
};

const findByEmail = async (email) => {
    const data = await usersRepo.findByEmail(email);
    return data;
}

const validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

module.exports = {
  getAll,
  validPassword,
  findByEmail
};