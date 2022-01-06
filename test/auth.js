/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaihttp);

let tokenAdmin;
let tokenUser;
const tokenInvalid =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0TmFtZSI6IkVsb24iLCJsYXN0TmFtZSI6Ik11c2siLCJlbWFpbCI6ImVfbXVza0B0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MiwiaWF0IjoxNjQwMDMzNjQwLCJleHAiOjE2NDAwNjI0NDB9.MUeeUm_WfSy6LOPgZGbF4jQYRyETURqx7iUQVqB0Pf_naVXjJSThx0mXRcM8MWb2bFv-7zOM0CvCeyhtuPDveSone7mzUzA3oA6Qxhtz_pcCB3huNpugnE1jC0PSw_EDd8OsKl8Z0se0aDmicL5YkURl0aifbyejD4RxqDDBstA';

/**
 * /auth/register
 * /auth/login
 * /auth/me
 */

describe('Post /auth', () => {
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

  it('Should login and return a token', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(login)
      .end((err, res) => {
        tokenUser = res.body.token;

        res.body.should.have.property('token');
        done();
      });
  });

  it('Should return the information of the user logged', (done) => {
    chai
      .request(app)
      .get('/auth/me')
      .set({ Authorization: `Bearer ${tokenUser}` })
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
      .set({ Authorization: `Bearer ${tokenUser}` })
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

describe('Error cases route /auth/register', () => {
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

  const userCase_lastName = {
    firstName: 'Franco',
    lastName: '',
    email: 'fgaratests@gmail.com',
    image: 'bold.jpeg',
    password: 'testing@It59',
  };

  const userCase_email = {
    firstName: 'Franco',
    lastName: 'Garancini',
    email: '',
    image: 'bold.jpeg',
    password: 'testing@It59',
  };

  it('Should fail registration, no email', (done) => {
    chai
      .request(app)
      .post('/auth/register')
      .send(userCase_email)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error[0].should.be
          .an('object')
          .with.keys('value', 'msg', 'param', 'location');
        res.body.error[0].msg.should.include('Invalid Email');
        done();
      });
  });
  it('Should fail registration, no lastname', (done) => {
    chai
      .request(app)
      .post('/auth/register')
      .send(userCase_lastName)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error[0].should.be
          .an('object')
          .with.keys('value', 'msg', 'param', 'location');
        res.body.error[0].msg.should.include('Last Name Required');
        done();
      });
  });
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

describe('Error cases /auth/login', () => {
  const userLoginWrongEmail = {
    email: 'btc@test_com',
    password: '123456',
  };
  const userLoginWrongPassword = {
    email: 'btc@test.com',
    password: '123',
  };
  it('Should fail login, Invalid Email', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(userLoginWrongEmail)
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

  it('Should fail login, Invalid password', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(userLoginWrongPassword)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe('Wrong cases /auth/me', () => {
  it('Should fail the attempt to get the user info', (done) => {
    chai
      .request(app)
      .get('/auth/me')
      .set({ Authorization: `Bearer ${tokenInvalid}` })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});