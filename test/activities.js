const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);
let token;

describe('test activities endpoints', () => {
  const user = {
    email: 'bascur@test.com',
    password: '123456'
  };
  before((done) => {
    chai.request(app)
      .post('/auth/login')
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        token = response.body.token;
        done();
      });
  });
  describe('GET /activities', () => {
    it('get the activities data', (done) => {
      chai.request(app)
        .get('/activities')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('content');
          response.body[0].should.have.property('image');
          done();
        });
    });
  });
  it('page not found', (done) => {
    chai.request(app)
      .get('/activities')
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
  it('invalid token', (done) => {
    chai.request(app)
      .get('/activities')
      .set({ Authorization: 'Bearer token' })
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  describe('POST /activities', () => {
    it('return the activity created', (done) => {
      const activity = {
        name: 'Activity testing',
        content: 'Activity testing',
        image: 'activity.jpg',
      };
      chai.request(app)
        .post('/activities')
        .send(activity)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'updatedAt', 'createdAt');
          done();
        });
    });
    it('missing activity name', (done) => {
      const activity = {
        content: 'Activity testing',
        image: 'activity.jpg',
      };
      chai.request(app)
        .post('/activities')
        .send(activity)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property('error');
          response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
          response.should.have.status(400);
          done();
        });
    });
    it('invalid token', (done) => {
      const activity = {
        name: 'Activity testing',
        content: 'Activity testing',
        image: 'activity.jpg',
      };
      chai.request(app)
        .post('/activities')
        .send(activity)
        .set({ Authorization: 'Bearer token' })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });
  describe('PUT /activities/:id', () => {
    it('update activities data', (done) => {
      const id = 1;
      const update = {
        name: 'Activity content',
        content: 'Activity content',
        image: 'activity.jpg'
      };
      chai.request(app)
        .put(`/activities/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(update)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'updatedAt', 'createdAt', 'deletedAt');
          response.body.id.should.be.equal(id);
          done();
        });
    });
    it('invalid token', (done) => {
      const id = 1;
      const update = {
        name: 'Activity content',
        content: 'Activity content',
        image: 'activity.jpg'
      };
      chai.request(app)
        .put(`/activities/${id}`)
        .set({ Authorization: 'Bearer token' })
        .send(update)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.error.should.be.eq('Invalid token');
          done();
        });
    });
    it('update activities data', (done) => {
      const id = 1;
      const update = {
        name: 'Activity content',
        content: 'Activity content',
        image: 'activity.jpg'
      };
      chai.request(app)
        .put(`/activities/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(update)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'updatedAt', 'createdAt', 'deletedAt');
          response.body.id.should.be.equal(id);
          done();
        });
    });
  });
});
