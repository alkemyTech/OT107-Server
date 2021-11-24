const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./modules/keys/privateKey.pem');
const publicKey = fs.readFileSync('./modules/keys/publicKey.pem');

const singOptions = {
  expiresIn: '8h',
  algorithm: 'RS256'
};

const createToken = (payload) => jwt.sign(payload, privateKey, singOptions);

const decodeToken = (token) => jwt.verify(token, publicKey);

module.exports = {
  createToken,
  decodeToken
};
