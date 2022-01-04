/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaihttp);

const invalidToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0TmFtZSI6IkVsb24iLCJsYXN0TmFtZSI6Ik11c2siLCJlbWFpbCI6ImVfbXVza0B0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MiwiaWF0IjoxNjQwMDMzNjQwLCJleHAiOjE2NDAwNjI0NDB9.MUeeUm_WfSy6LOPgZGbF4jQYRyETURqx7iUQVqB0Pf_naVXjJSThx0mXRcM8MWb2bFv-7zOM0CvCeyhtuPDveSone7mzUzA3oA6Qxhtz_pcCB3huNpugnE1jC0PSw_EDd8OsKl8Z0se0aDmicL5YkURl0aifbyejD4RxqDDBstA';
let adminToken;
let standardToken;
let standardUserId;

describe('Route /users', () => {
  const userAdmin = {
    email: 'agustin_tafura@test.com',
    password: '123456',
  };
  const userStandar = {
    email: 'xavier@xmen.com',
    password: 'Marvel$1963',
  };
  before((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(userAdmin)
      .end((err, res) => {
        res.should.have.status(200);
        adminToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(userStandar)
      .end((err, res) => {
        res.should.have.status(200);
        standardToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .get('/auth/me')
      .set({ Authorization: `Bearer ${standardToken}` })
      .end((err, res) => {
        res.should.have.status(200);
        standardUserId = res.body.user.id;
        done();
      });
  });

  it('It should get all the users as admin', (done) => {
    chai
      .request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body[0].should.have.property('firstName');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('image');
        done();
      });
  });
  it('It should not get all the users', (done) => {
    chai
      .request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${standardToken}` })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('Object');
        done();
      });
  });
  it('should not update the user invalid token', (done) => {
    const update = { firstname: 'Vitalik', lastname: 'Vutlerin' };
    chai
      .request(app)
      .put('/users/13')
      .send(update)
      .set({ Authorization: `Bearer ${invalidToken}` })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should update the user as admin', (done) => {
    const update = { firstname: 'Vitalik', lastname: 'Vutlerin' };
    chai
      .request(app)
      .put(`/users/${standardUserId}`)
      .send(update)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('image');
        done();
      });
  });
  it('should not update the user', (done) => {
    const update = { firstname: 'Vitalik', lastname: 'Vutlerin' };
    chai
      .request(app)
      .put('/users/13')
      .send(update)
      .set({ Authorization: `Bearer ${standardToken}` })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should update the user', (done) => {
    const update = { firstname: 'Vitalik', lastname: 'Vutlerin' };
    chai
      .request(app)
      .put(`/users/${standardUserId}`)
      .send(update)
      .set({ Authorization: `Bearer ${standardToken}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('image');
        done();
      });
  });
  it('should not delete de user', (done) => {
    chai
      .request(app)
      .delete('/users/0')
      .set({ Authorization: `Bearer ${standardToken}` })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not delete de user as admin', (done) => {
    chai
      .request(app)
      .delete('/users/0')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should delete de user', (done) => {
    chai
      .request(app)
      .delete(`/users/${standardUserId}`)
      .set({ Authorization: `Bearer ${standardToken}` })
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
