const Models = require('../models');
const { decodeToken } = require('../modules/auth');

const isAuth = async (req, res, next) => {
  const token = req.header('x-token');
  if (!token) return res.status(403).json({ message: 'Acceso no autorizado' });

  try {
    const { id } = decodeToken(token);
    const user = await Models.Users.findOne({ where: { id } });

    if (!user) return res.status(403).json({ message: 'El usuario no existe' });

    next();
  } catch (error) {
    res.status(403).json(`Token no válido - ${error.message}`);
  }
};

module.exports = {
  isAuth
};
