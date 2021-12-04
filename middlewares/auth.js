const { check, validationResult } = require('express-validator');
const usersServices = require('../services/users');

const rolesServices = require('../services/roles');
const auth = require('../modules/auth');

const isOwnUser = async (req, res, next) => {
  const userId = req.params.id;
  const bearertoken = req.headers.authorization;
  if (!bearertoken) return res.status(401).json({ error: 'Access denied' });
  try {
    const token = bearertoken.split(' ')[1];
    const usuarioToken = auth.decodeToken(token);
    req.params.tokenizedUserId = usuarioToken.id;
    if (Number.parseInt(userId) === usuarioToken.id) return next();
    const user = await usersServices.getById(usuarioToken.id);
    if (!user) return res.status(401).json({ error: 'Access denied' });
    const adminUser = await rolesServices.getByName('Admin');
    if (user.dataValues.roleId === adminUser.id) return next();
    const e = new Error();
    throw e;
  } catch (error) {
    res.status(400).json({ error: 'Access denied' });
  }
};

const isAdmin = async (req, res, next) => {
  const bearertoken = req.headers.authorization;
  const token = bearertoken.split(' ')[1];
  const adminRole = await rolesServices.getByName('Admin');

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const user = auth.decodeToken(token);

    if (user.roleId !== adminRole.id) return res.status(401).json({ error: 'Access denied' });
    next();
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' });
  }
};

const isAuth = async (req, res, next) => {
  const bearertoken = req.headers.authorization;
  const token = bearertoken.split(' ')[1];
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

const registerInputValidation = [
  check('firstName', 'First Name Required').not().isEmpty(),
  check('lastName', 'Last Name Required').not().isEmpty(),
  check('email', 'Invalid Email').isEmail(),
  check('password', 'Invalid Password').not().isEmpty().isStrongPassword(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

const loginInputValidation = [
  check('email').exists().isEmail(),
  check('password').exists().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

module.exports = {
  isAdmin,
  isOwnUser,
  isAuth,
  registerInputValidation,
  loginInputValidation
};
