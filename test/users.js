/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const { it } = require('mocha');
const app = require('../app');

chai.should();
chai.use(chaihttp);

let token;
let tokenDelete;

describe('Route /users', () => {
  const user = {
    email: 'e_musk@test.com',
    password: '123456',
  };
  before((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
        done();
      });
  });

  it('It should get all the users', (done) => {
    chai
      .request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body[0].should.have.property('firstName');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('image');
        done();
      });
  });
});

describe('Route /users/:id', () => {
  const user = {
    email: 'lana_trico@gmail.com',
    password: '123456@Miau',
  };
  before((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
        done();
      });
  });

  it('It should update an user', (done) => {
    const update = { firstname: 'Vitalik', lastname: 'Vutlerin' };
    chai
      .request(app)
      .patch('/users/19')
      .send(update)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('image');
        done();
      });
  });
});

describe('Route /users/:id', () => {
  const user = {
    email: 'fgara@test.com',
    password: 'Passw@rd94',
  };
  before((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
        done();
      });
  });

  it('should not get the list of users', (done) => {
    chai
      .request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should not update the user', (done) => {
    const update = { firstname: 'Vitalik', lastname: 'Vutlerin' };

    chai
      .request(app)
      .patch('/users/13')
      .send(update)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should not delete the user', (done) => {
    chai
      .request(app)
      .delete('/users/13')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('DELETE /user/:id', () => {
  const user = {
    email: 'lana_trico@gmail.com',
    password: '123456@Miau',
  };
  before((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        tokenDelete = res.body.token;
        done();
      });
  });
  it('Shoud delete an user', (done) => {
    chai
      .request(app)
      .delete('/users/19')
      .set({ Authorization: `Bearer ${tokenDelete}` })
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
