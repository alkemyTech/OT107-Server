const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);
let tokenAdmin;
let token;

const userAdmin = {
  email: 'agustin_tafura@test.com',
  password: '123456'
};

before(done => {
  chai.request(app)
    .post('/auth/login')
    .send({
      email: 'facebook@facebook.com',
      password: '123456'
    })
    .end((err, response) => {
      response.should.have.status(200);
      token = response.body.token;
    });

  chai.request(app)
    .post('/auth/login')
    .send(userAdmin)
    .end((err, response) => {
      response.should.have.status(200);
      tokenAdmin = response.body.token;
      done();
    });
});

describe('GET /organizations/public', () => {
  it('get the organization data', (done) => {
    chai.request(app)
      .get('/organizations/public')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('image');
        response.body.should.have.property('phone');
        response.body.should.have.property('address');
        response.body.should.have.property('urlFacebook');
        response.body.should.have.property('urlLinkedin');
        response.body.should.have.property('urlInstagram');
        response.body.should.have.property('Slides');
        response.body.Slides.should.be.a('array');
        done();
      });
  });

  it('page not found', (done) => {
    chai.request(app)
      .get('/organization/public')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('PUT /organizations/public', () => {
  it('update organization data', (done) => {
    const update = {
      name: 'Ahora Somos Mas',
      image: 'ong-somosmas.jpg',
      phone: 1160112988,
      email: 'somosmas@mail.com',
      welcomeText: 'hola esta es la ong somos mas'
    };
    chai.request(app)
      .put('/organizations/public')
      .set({ Authorization: `Bearer ${tokenAdmin}` })
      .send(update)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      });
  });

  it('Invalid token', (done) => {
    const update = {
      name: 'Ahora Somos Mas',
      image: 'ong-somosmas.jpg',
      phone: 1160112988,
      email: 'somosmas@mail.com',
      welcomeText: 'hola esta es la ong somos mas'
    };
    chai.request(app)
      .put('/organizations/public')
      .set({ Authorization: 'Bearer invalidtoken' })
      .send(update)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.error.should.be.eq('Invalid token');
        done();
      });
  });

  it('missing require data', (done) => {
    const update = { };
    chai.request(app)
      .put('/organizations/public')
      .set({ Authorization: `Bearer ${tokenAdmin}` })
      .send(update)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('error');
        done();
      });
  });

  it('not admin user update', (done) => {
    const update = {
      name: 'Ahora Somos Mas',
      image: 'ong-somosmas.jpg',
      phone: 1160112988,
      email: 'somosmas@mail.com',
      welcomeText: 'hola esta es la ong somos mas'
    };
    chai.request(app)
      .put('/organizations/public')
      .set({ Authorization: `Bearer ${token}` })
      .send(update)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.error.should.be.eq('Access denied');
        done();
      });
  });
});
