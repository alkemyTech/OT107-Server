/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaihttp);

let token;

/**
 * /auth/register
 * /auth/login
 * /auth/me
 */

describe('Post /auth/register', () => {
  const user = {
    firstName: 'Franco',
    lastName: 'Garancini',
    email: 'fgaratests@gmail.com',
    image: 'bold.jpeg',
    password: 'testing@It59',
  };

  const login = {
    email: 'fgaratests@gmail.com',
    password: 'testing@It59',
  };
  describe('Route /auth/register', () => {
    it('Should register a new user', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          res.body.should.have.property('user');
          res.body.user.should.have.property('firstName');
          res.body.user.should.have.property('lastName');
          res.body.user.should.have.property('image');
          done();
        });
    });
  });

  describe('Route /auth/login', () => {
    it('Should login and return a token', (done) => {
      chai
        .request(app)
        .post('/auth/login')
        .send(login)
        .end((err, res) => {
          token = res.body.token;

          res.body.should.have.property('token');
          done();
        });
    });
  });

  describe('Route /auth/me', () => {
    it('Should return the information of the user logged', (done) => {
      chai
        .request(app)
        .get('/auth/me')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.user.should.have.property('id');
          res.body.user.should.have.property('firstName');
          res.body.user.should.have.property('lastName');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('image');
          res.body.user.should.have.property('createdAt');
          res.body.user.should.have.property('updatedAt');
          done();
        });
    });
  });
});
