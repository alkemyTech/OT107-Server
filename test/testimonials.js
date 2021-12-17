const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);
let token;

describe('Somos más', () => {
  const user = {
    email: 'andrea_maccan@test.com',
    password: '123456'
  };
  before(done => {
    chai.request(app)
      .post('/auth/login')
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        token = response.body.token;
        done();
      });
  });

  describe('GET /testimonials', () => {
    it('It should return testimonials data', (done) => {
      chai.request(app)
        .get('/testimonials')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          response.body.should.have.keys('countTestimonials', 'lastPage', 'previousPage', 'nextPage', 'data');
          response.body.data.should.have.lengthOf.within(1, 10);
          response.body.data.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'content', 'image'));
          done();
        });
    });

    it('It should return an error for typo', (done) => {
      chai.request(app)
        .get('/testimonial')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it('The page parameter must be a number', (done) => {
      chai.request(app)
        .get('/testimonials?page=a')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.text.should.include('The page parameter must be a number');
          done();
        });
    });

    it('You must provide a page number', (done) => {
      chai.request(app)
        .get('/testimonials?page=')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.text.should.include('You must provide a page number');
          done();
        });
    });

    it('The page must be greater than one', (done) => {
      chai.request(app)
        .get('/testimonials?page=-1')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.text.should.include('The page must be greater than one');
          done();
        });
    });

    it('The requested page is greater than the last page', (done) => {
      chai.request(app)
        .get('/testimonials?page=200')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.text.should.include('The requested page is greater than the last page');
          done();
        });
    });

    it('It should return testimonial by its id', (done) => {
      const id = 1;
      chai.request(app)
        .get('/testimonials/' + id)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.keys('id', 'name', 'image', 'content');
          response.body.should.have.property('id').eq(1);
          done();
        });
    });

    it('It should not return testimonial that does not exist', (done) => {
      const id = 200;
      chai.request(app)
        .get('/testimonials/' + id)
        .set({ Authorization: `Bearer ${token}` })
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
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.keys('message', 'id', 'name', 'image', 'content');
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
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
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
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
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
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id').eq(2);
          response.body.should.have.keys('id', 'name', 'image', 'content');
          done();
        });
    });
  });

  describe('DELETE /testimonials', () => {
    it('It should delete a testimonial', (done) => {
      const id = 4;
      chai.request(app)
        .delete('/testimonials/' + id)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.be.eq('"Testimonial has been removed"');
          done();
        });
    });

    it('It should not delete a testimonial that does not exist', (done) => {
      const id = 200;
      chai.request(app)
        .delete('/testimonials/' + id)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.include('Testimonial not found');
          done();
        });
    });
  });
});
