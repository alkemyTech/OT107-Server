const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);
let adminToken;
let authToken;
const invalidToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0TmFtZSI6IkVsb24iLCJsYXN0TmFtZSI6Ik11c2siLCJlbWFpbCI6ImVfbXVza0B0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MiwiaWF0IjoxNjQwMDMzNjQwLCJleHAiOjE2NDAwNjI0NDB9.MUeeUm_WfSy6LOPgZGbF4jQYRyETURqx7iUQVqB0Pf_naVXjJSThx0mXRcM8MWb2bFv-7zOM0CvCeyhtuPDveSone7mzUzA3oA6Qxhtz_pcCB3huNpugnE1jC0PSw_EDd8OsKl8Z0se0aDmicL5YkURl0aifbyejD4RxqDDBstA';

const adminUser = {
  email: 'bascur@test.com',
  password: '123456'
};

const authUser = {
  email: 'steeve_j@test.com',
  password: '123456'
};

before((done) => {
  chai.request(app)
    .post('/auth/login')
    .send(adminUser)
    .end((err, response) => {
      response.should.have.status(200);
      adminToken = response.body.token;
    });

  chai.request(app)
    .post('/auth/login')
    .send(authUser)
    .end((err, response) => {
      response.should.have.status(200);
      authToken = response.body.token;
      done();
    });
});

describe('GET /activities [isAdmin]', () => {
  it('It should return activities data', (done) => {
    chai.request(app)
      .get('/activities')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('content');
        response.body[0].should.have.property('image');
        done();
      });
  });

  it('It should not return activities data, Access denied: missing token', (done) => {
    chai.request(app)
      .get('/activities')
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').eq('Access denied');
        done();
      });
  });

  it('It should not return activities data, Invalid token: need admin token', (done) => {
    chai.request(app)
      .get('/activities')
      .set({ Authorization: `Bearer ${authToken}` })
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').eq('Access denied');
        done();
      });
  });
  it('It should not return activities data, Invalid token: need valid token', (done) => {
    chai.request(app)
      .get('/activities')
      .set({ Authorization: `Bearer ${invalidToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').eq('Invalid token');
        done();
      });
  });
});

describe('PUT /activities/:id', () => {
  it('It should update an activity by its id', (done) => {
    const id = 1;
    const update = {
      name: 'Activity content',
      content: 'Activity content',
      image: 'activity.jpg'
    };
    chai.request(app)
      .put(`/activities/${id}`)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(update)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'updatedAt', 'createdAt', 'deletedAt');
        response.body.should.have.property('name').eq(update.name);
        response.body.should.have.property('image').eq(update.image);
        response.body.should.have.property('content').eq(update.content);
        response.body.should.have.property('id').eq(1);
        done();
      });
  });
  it('It should not update an activity, Access denied: missing token', (done) => {
    const id = 1;
    const update = {
      name: 'Activity name',
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .put(`/activities/${id}`)
      .send(update)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });
  it('It should not update an activity, Invalid token: need admin token', (done) => {
    const id = 1;
    const update = {
      name: 'Activity name',
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .put(`/activities/${id}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .send(update)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });
  it('It should not update an activity , Invalid token: need valid token', (done) => {
    const id = 1;
    const update = {
      name: 'Activity name',
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .put(`/activities/${id}`)
      .set({ Authorization: `Bearer ${invalidToken}` })
      .send(update)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').include('Invalid token');
        done();
      });
  });
});

describe('POST /activities', () => {
  it('It should create an activity', (done) => {
    const activity = {
      name: 'Activity name',
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .post('/activities')
      .send(activity)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.keys('id', 'name', 'image', 'content', 'createdAt', 'updatedAt');
        response.body.should.have.property('name').eq(activity.name);
        response.body.should.have.property('image').eq(activity.image);
        response.body.should.have.property('content').eq(activity.content);
        done();
      });
  });
  it('It should not create an Activity, Access denied: missing token', (done) => {
    const activity = {
      name: 'Activity name',
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .post('/activities')
      .send(activity)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });
  it('It should not create an activity, Invalid token: need admin token', (done) => {
    const activity = {
      name: 'Activity name',
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .post('/activities')
      .set({ Authorization: `Bearer ${authToken}` })
      .send(activity)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });
  it('It should not create an activity, Invalid token: need valid token', (done) => {
    const activity = {
      name: 'Activity name',
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .post('/activities')
      .set({ Authorization: `Bearer ${invalidToken}` })
      .send(activity)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').include('Invalid token');
        done();
      });
  });
  it('It should not create an activity without name property', (done) => {
    const activity = {
      image: 'Activity image',
      content: 'Activity content'
    };
    chai.request(app)
      .post('/activities')
      .send(activity)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.include('Name is required');
        done();
      });
  });
  it('It should not create an activity without content property', (done) => {
    const activity = {
      name: 'Activity name',
      image: 'Activity image',
    };
    chai.request(app)
      .post('/activities')
      .send(activity)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.include('Content is required');
        done();
      });
  });
});
