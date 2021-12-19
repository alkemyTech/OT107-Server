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

  let userID;

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
          userID = res.body.user.id;
          done();
        });
    });
  });
  describe('DELETE /user/:id', () => {
    it('Shoud delete an user', (done) => {
      chai
        .request(app)
        .delete(`/users/${userID}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});

describe('Error cases route /auth', () => {
  const userCase_password = {
    firstName: 'Franco',
    lastName: 'Garancini',
    email: 'fgaratests@gmail.com',
    image: 'bold.jpeg',
    password: 'testingIt59',
  };
  const userCase_firstName = {
    firstName: '',
    lastName: 'Garancini',
    email: 'fgaratests@gmail.com',
    image: 'bold.jpeg',
    password: 'testing@It59',
  };

  const userLogin = {
    email: 'btc@test_com',
    password: '123456',
  };
  describe('Route /auth/register', () => {
    it('Should fail registration, wrong password format', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .send(userCase_password)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error[0].should.be
            .an('object')
            .with.keys('value', 'msg', 'param', 'location');
          res.body.error[0].msg.should.include('Invalid Password');
          done();
        });
    });
  });
  describe('Route /auth/register', () => {
    it('Should fail registration, First name required', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .send(userCase_firstName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error[0].should.be
            .an('object')
            .with.keys('value', 'msg', 'param', 'location');
          res.body.error[0].msg.should.include('First Name Required');
          done();
        });
    });
  });

  describe('Route /auth/login', () => {
    it('Should fail login, Invalid Email', (done) => {
      chai
        .request(app)
        .post('/auth/login')
        .send(userLogin)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error[0].should.be
            .an('object')
            .with.keys('value', 'msg', 'param', 'location');
          res.body.error[0].msg.should.include('Invalid value');
          res.body.error[0].param.should.include('email');
          done();
        });
    });
  });
});
