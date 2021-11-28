/* eslint-disable consistent-return */
const rolesServices = require('../services/roles');
const auth = require('../module/auth');

const isAdmin = async (req, res, next) => {
  const token = req.header('auth-token');
  const adminRole = await rolesServices.getByName('admin');

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const user = auth.decodeToken(token);

    if (user.roleId !== adminRole.id) return res.status(401).json({ error: 'Access denied' });
    next();
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' });
  }
};

module.exports = {
  isAdmin
};
