const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);
let token;

/**
 * Test Api  - generate token
 */
describe('Set Token - POST /auth/login', () => {
  const user = {
    email: 'agustin_tafura@test.com',
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

  /**
 * Test Api  - News endpoint
 */
  describe('GET /news', () => {
    it('Return first page results news list', (done) => {
      const page = 1;
      chai.request(app)
        .get(`/news?page=${page}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          response.body.should.have.keys('countNews', 'lastPage', 'previousPage', 'nextPage', 'data');
          response.body.should.have.property('previousPage').equal(null);
          response.body.data.should.have.lengthOf.within(1, 10);
          response.body.data.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'content', 'image', 'categoryId'));
          done();
        });
    });

    it('Return last page results news list', (done) => {
      const page = 4; // In this case News last page in DB is 4
      chai.request(app)
        .get(`/news?page=${page}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          response.body.should.have.keys('countNews', 'lastPage', 'previousPage', 'nextPage', 'data');
          response.body.should.have.property('nextPage').equal(null);
          response.body.data.should.have.lengthOf.within(1, 10);
          response.body.data.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'content', 'image', 'categoryId'));
          done();
        });
    });

    it('Return error message. Require a provide a number as a parameter of page', (done) => {
      const page = '';
      chai.request(app)
        .get(`/news?page=${page}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.include('You must provide a page number.');
          done();
        });
    });

    it('Return error message. Require a number as a parameter of page', (done) => {
      const page = 'abc';
      chai.request(app)
        .get(`/news?page=${page}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.include('The page parameter must be a number.');
          done();
        });
    });

    it('Return error message. Require a number greater than zero', (done) => {
      const page = -5;
      chai.request(app)
        .get(`/news?page=${page}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.include('The page must be greater than one.');
          done();
        });
    });

    it('Return error message. Require a number greater than zero', (done) => {
      const page = 1000;
      chai.request(app)
        .get(`/news?page=${page}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.include('The requested page is greater than the last page.');
          done();
        });
    });
  });

  describe('POST /news', () => {
    it('Return the noelty created', (done) => {
      const novelty = {
        name: 'News testing',
        content: 'Content news testing',
        image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
        categoryId: 1
      };
      chai.request(app)
        .post('/news')
        .send(novelty)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt');
          done();
        });
    });

    it('Return an error - can\'t creat a news without name', (done) => {
      const novelty = {
        content: 'Content news testing',
        image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
        categoryId: 1
      };
      chai.request(app)
        .post('/news')
        .send(novelty)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property('error');
          response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
          response.should.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /news/:id', () => {
    const noveltyId = 3;
    it('It should delete a novelty if exist id in DB', (done) => {
      chai.request(app)
        .delete(`/news/${noveltyId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          if (response.status === 500) {
            response.text.should.include('Error: bad request');
          } else {
            response.should.have.status(204);
            response.body.should.be.empty;
          }
          done();
        });
    });
  });

  describe('GET /news/:id', () => {
    it('Returns a novelty', (done) => {
      const id = 4;
      chai.request(app)
        .get(`/news/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt', 'deletedAt');
          response.body.id.should.be.equal(id);
          done();
        });
    });

    it('Returns a bad request status 500', (done) => {
      const id = 10000;
      chai.request(app)
        .get(`/news/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(500);
          response.text.should.include('Error: bad request');
          done();
        });
    });
  });

  describe('PUT /news/:id', () => {
    it('Returns the novelty updated', (done) => {
      const id = 4;
      const body = {
        name: 'name changed',
        content: 'Content news 1',
        image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
        categoryId: 1
      };
      chai.request(app)
        .put(`/news/${id}`)
        .send(body)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt', 'deletedAt');
          response.body.id.should.be.equal(id);
          done();
        });
    });

    it('Returns a bad request status 400', (done) => {
      const id = 10000;
      const body = { name: 'name changed' };
      chai.request(app)
        .put(`/news/${id}`)
        .send(body)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property('error');
          response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
          response.should.have.status(400);
          done();
        });
    });
  });
});
