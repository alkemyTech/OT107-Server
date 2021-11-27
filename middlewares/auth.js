const usersServices = require('../services/users');
const auth = require('../modules/auth');

const isAuth = async (req, res, next) => {
  const token = req.header('x-token');
  if (!token) return res.status(403).json({ message: 'Acceso no autorizado' });

  try {
    const { id } = await auth.decodeToken(token);
    const userAuth = await usersServices.getById(id);

    if (!userAuth) return res.status(403).json({ message: 'El usuario no existe' });

    next();
  } catch (error) {
    res.status(403).json(`Token no válido - ${error.message}`);
  }
};

module.exports = {
  isAuth
};
