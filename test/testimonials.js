const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);
let adminToken;
let authToken;
let invalidToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0TmFtZSI6IkVsb24iLCJsYXN0TmFtZSI6Ik11c2siLCJlbWFpbCI6ImVfbXVza0B0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MiwiaWF0IjoxNjQwMDMzNjQwLCJleHAiOjE2NDAwNjI0NDB9.MUeeUm_WfSy6LOPgZGbF4jQYRyETURqx7iUQVqB0Pf_naVXjJSThx0mXRcM8MWb2bFv-7zOM0CvCeyhtuPDveSone7mzUzA3oA6Qxhtz_pcCB3huNpugnE1jC0PSw_EDd8OsKl8Z0se0aDmicL5YkURl0aifbyejD4RxqDDBstA';

const adminUser = {
  email: 'andrea_maccan@test.com',
  password: '123456'
};

const authUser = {
  email: 'e_musk@test.com',
  password: '123456'
};

before(done => {
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
    });
  done();
});

describe('GET /testimonials [isAdmin]', () => {
  it('It should return testimonials data', (done) => {
    chai.request(app)
      .get('/testimonials')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body.should.have.keys('count', 'lastPage', 'previousPage', 'nextPage', 'data');
        response.body.data.should.have.lengthOf.within(1, 10);
        response.body.data[0].should.have.keys('id', 'name', 'content', 'image');
        done();
      });
  });

  it('It should not return testimonials data, Access denied: missing token', (done) => {
    chai.request(app)
      .get('/testimonials')
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').eq('Access denied');
        done();
      });
  });

  it('It should not return testimonials data, Invalid token: need admin token', (done) => {
    chai.request(app)
      .get('/testimonials')
      .set({ Authorization: `Bearer ${authToken}` })
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').eq('Access denied');
        done();
      });
  });

  it('It should not return testimonials data, Invalid token: need valid token', (done) => {
    chai.request(app)
      .get('/testimonials')
      .set({ Authorization: `Bearer ${invalidToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').eq('Invalid token');
        done();
      });
  });

  it('The page parameter must be a number', (done) => {
    chai.request(app)
      .get('/testimonials?page=a')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').eq('The page parameter must be a number.');
        done();
      });
  });

  it('You must provide a page number', (done) => {
    chai.request(app)
      .get('/testimonials?page=')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.include('You must provide a page number');
        done();
      });
  });

  it('The page must be greater than zero', (done) => {
    chai.request(app)
      .get('/testimonials?page=-1')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.include('The page must be greater than one');
        done();
      });
  });

  it('The requested page is greater than the last page', (done) => {
    chai.request(app)
      .get('/testimonials?page=200')
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.include('The requested page is greater than the last page');
        done();
      });
  });
});

describe('GET /testimonials/:id', () => {
  it('It should return testimonial by its id', (done) => {
    const id = 1;
    chai.request(app)
      .get('/testimonials/' + id)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.keys('id', 'name', 'image', 'content');
        response.body.should.have.property('id').eq(1);
        done();
      });
  });

  it('It should not return testimonial by its id, Access denied: missing token', (done) => {
    const id = 1;
    chai.request(app)
      .get('/testimonials/' + id)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not return testimonial by its id, Invalid token: need admin token', (done) => {
    const id = 1;
    chai.request(app)
      .get('/testimonials/' + id)
      .set({ Authorization: `Bearer ${authToken}` })
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not return testimonial by its id, Invalid token: need valid token', (done) => {
    const id = 1;
    chai.request(app)
      .get('/testimonials/' + id)
      .set({ Authorization: `Bearer ${invalidToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').include('Invalid token');
        done();
      });
  });

  it('It should not return testimonial that does not exist', (done) => {
    const id = 200;
    chai.request(app)
      .get('/testimonials/' + id)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.text.should.include('Testimonial not found');
        done();
      });
  });

  it('It should not return testimonial where input is a letter', (done) => {
    const id = 'a';
    chai.request(app)
      .get('/testimonials/' + id)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.text.should.include('Testimonial not found');
        done();
      });
  });
});

describe('POST /testimonials', () => {
  it('It should create a testimonial', (done) => {
    const testimonial = {
      name: 'Testimonial 4',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .post('/testimonials')
      .send(testimonial)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.keys('message', 'id', 'name', 'image', 'content');
        response.body.should.have.property('name').eq(testimonial.name);
        response.body.should.have.property('image').eq(testimonial.image);
        response.body.should.have.property('content').eq(testimonial.content);
        done();
      });
  });

  it('It should not create a testimonial, Access denied: missing token', (done) => {
    const testimonial = {
      name: 'Testimonial 4',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .post('/testimonials')
      .send(testimonial)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not create a testimonial, Invalid token: need admin token', (done) => {
    const testimonial = {
      name: 'Testimonial 4',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .post('/testimonials')
      .set({ Authorization: `Bearer ${authToken}` })
      .send(testimonial)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not create a testimonial, Invalid token: need valid token', (done) => {
    const testimonial = {
      name: 'Testimonial 4',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .post('/testimonials')
      .set({ Authorization: `Bearer ${invalidToken}` })
      .send(testimonial)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').include('Invalid token');
        done();
      });
  });

  it('It should not create a testimonial without name property', (done) => {
    const testimonial = {
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .post('/testimonials')
      .send(testimonial)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
        response.text.should.include('Name is required');
        done();
      });
  });

  it('It should not create a testimonial without content property', (done) => {
    const testimonial = {
      name: 'Testimonial 4',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg'
    };
    chai.request(app)
      .post('/testimonials')
      .send(testimonial)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
        response.text.should.include('Content is required');
        done();
      });
  });
});

describe('PUT /testimonials', () => {
  it('It should update a testimonial', (done) => {
    const id = 2;
    const testimonial = {
      name: 'Testimonial 2',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .put('/testimonials/' + id)
      .send(testimonial)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('id').eq(2);
        response.body.should.have.keys('id', 'name', 'image', 'content');
        response.body.should.have.property('name').eq(testimonial.name);
        response.body.should.have.property('image').eq(testimonial.image);
        response.body.should.have.property('content').eq(testimonial.content);
        done();
      });
  });

  it('It should not update a testimonial, Access denied: missing token', (done) => {
    const id = 2;
    const testimonial = {
      name: 'Testimonial 2',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .put('/testimonials/' + id)
      .send(testimonial)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not update a testimonial, Invalid token: need admin token', (done) => {
    const id = 2;
    const testimonial = {
      name: 'Testimonial 2',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .put('/testimonials/' + id)
      .set({ Authorization: `Bearer ${authToken}` })
      .send(testimonial)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not update a testimonial, Invalid token: need valid token', (done) => {
    const id = 2;
    const testimonial = {
      name: 'Testimonial 2',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.'
    };
    chai.request(app)
      .put('/testimonials/' + id)
      .set({ Authorization: `Bearer ${invalidToken}` })
      .send(testimonial)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').include('Invalid token');
        done();
      });
  });
});

describe('DELETE /testimonials', () => {
  it('It should delete a testimonial', (done) => {
    const id = 4;
    chai.request(app)
      .delete('/testimonials/' + id)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.text.should.be.eq('"Testimonial has been removed"');
        done();
      });
  });

  it('It should not delete a testimonial, Access denied: missing token', (done) => {
    const id = 4;
    chai.request(app)
      .delete('/testimonials/' + id)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not delete a testimonial, Invalid token: need admin token', (done) => {
    const id = 4;
    chai.request(app)
      .delete('/testimonials/' + id)
      .set({ Authorization: `Bearer ${authToken}` })
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error').include('Access denied');
        done();
      });
  });

  it('It should not delete a testimonial, Invalid token: need valid token', (done) => {
    const id = 4;
    chai.request(app)
      .delete('/testimonials/' + id)
      .set({ Authorization: `Bearer ${invalidToken}` })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error').include('Invalid token');
        done();
      });
  });

  it('It should not delete a testimonial that does not exist', (done) => {
    const id = 200;
    chai.request(app)
      .delete('/testimonials/' + id)
      .set({ Authorization: `Bearer ${adminToken}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.text.should.include('Testimonial not found');
        done();
      });
  });
});
