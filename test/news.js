const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const fs = require('fs');

chai.should();
chai.use(chaiHttp);
let adminToken;
let authToken;

const adminUser = {
  email: 'agustin_tafura@test.com',
  password: '123456'
};

const authUser = {
  email: 'e_musk@test.com',
  password: '123456'
};
/**
 * Test Api  - generate token
 */
describe('Set Tokens - POST /auth/login', () => {
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

  /**
 * Test Api  - News endpoint
 */
  describe('Test News endpoints', () => {
    describe('GET /news', () => {
      it('GET all - first page - (adminToken)', (done) => {
        const page = 1;
        chai.request(app)
          .get(`/news?page=${page}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(200);
            response.should.be.a('object');
            response.body.should.have.keys('count', 'lastPage', 'previousPage', 'nextPage', 'data');
            response.body.should.have.property('previousPage').equal(null);
            response.body.data.should.have.lengthOf.within(1, 10);
            response.body.data.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'content', 'image', 'categoryId'));
            done();
          });
      });

      it('GET all - last page - (adminToken)', (done) => {
        const page = 4; // In this case News last page in DB is 4
        chai.request(app)
          .get(`/news?page=${page}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(200);
            response.should.be.a('object');
            response.body.should.have.keys('count', 'lastPage', 'previousPage', 'nextPage', 'data');
            response.body.should.have.property('nextPage').equal(null);
            response.body.data.should.have.lengthOf.within(1, 10);
            response.body.data.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'content', 'image', 'categoryId'));
            done();
          });
      });

      it('get all - empty page param - (adminToken)', (done) => {
        const page = '';
        chai.request(app)
          .get(`/news?page=${page}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.include('You must provide a page number.');
            done();
          });
      });

      it('get all - string page param - (adminToken)', (done) => {
        const page = 'abc';
        chai.request(app)
          .get(`/news?page=${page}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.include('The page parameter must be a number.');
            done();
          });
      });

      it('get all - less than zero page param - (adminToken)', (done) => {
        const page = -5;
        chai.request(app)
          .get(`/news?page=${page}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.include('The page must be greater than one.');
            done();
          });
      });

      it('get all - empty page param - (adminToken)', (done) => {
        const page = 1000;
        chai.request(app)
          .get(`/news?page=${page}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.include('The requested page is greater than the last page.');
            done();
          });
      });
    });

    describe('POST /news', () => {
      it('Create a new novelty - (adminToken)', (done) => {
        const novelty = {
          name: 'News testing',
          content: 'Content news testing',
          categoryId: 1
        };
        chai.request(app)
          .post('/news')
          .field('name', novelty.name)
          .field('content', novelty.content)
          .field('categoryId', novelty.categoryId)
          .set({ Authorization: `Bearer ${adminToken}` })
          .attach('image', fs.readFileSync('test/imageTest.jpg'), 'imageTest.jpg')
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt');
            done();
          });
      });

      it('Wrong body - field required -  (adminToken)', (done) => {
        const novelty = {
          content: 'Content news testing',
          image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        };
        chai.request(app)
          .post('/news')
          .send(novelty)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.body.should.have.property('error');
            response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
            response.should.have.status(400);
            done();
          });
      });

      it('create novelty - (invalid token)', (done) => {
        const novelty = {
          name: 'News testing',
          content: 'Content news testing',
          image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        };
        chai.request(app)
          .post('/news')
          .send(novelty)
          .set({ Authorization: `Bearer ${authToken}` })
          .end((err, response) => {
            response.should.have.status(401);
            response.text.should.include('Access denied');
            done();
          });
      });

      it('create novelty - (no token)', (done) => {
        const novelty = {
          name: 'News testing',
          content: 'Content news testing',
          image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        };
        chai.request(app)
          .post('/news')
          .set({ Authorization: '' })
          .send(novelty)
          .end((err, response) => {
            response.should.have.status(401);
            response.text.should.include('Access denied');
            done();
          });
      });

      it('create novelty - (expired token)', (done) => {
        const novelty = {
          name: 'News testing',
          content: 'Content news testing',
          image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        };
        const oldToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQWd1c3RpbiIsImxhc3ROYW1lIjoiVGFmdXJhIiwiZW1haWwiOiJhZ3VzdGluX3RhZnVyYUB0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MSwiaWF0IjoxNjM5OTQwNjkwLCJleHAiOjE2Mzk5Njk0OTB9.aWxY-Bb5xSCXgzkb6UQRQqEuM5P9j0elwyc-fK7jEy7wj5981pV0fpCwBbgtrFnm3Da1fgqU61YKeZ8bvDUklcL-b4I45_RmPO5YrzZbq5FqyWETpvSHjwoHslnpT4xs-nXf5VOuDr2_OqiwUSTcTCV0byjER0Gw2E2_K_Ui0Mw';
        chai.request(app)
          .post('/news')
          .set({ Authorization: `Bearer ${oldToken}` })
          .send(novelty)
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.include('Invalid token');
            done();
          });
      });
    });

    describe('DELETE /news/:id', () => {
      it('Delete a novelty - (adminToken)', (done) => {
        const id = 3;
        chai.request(app)
          .delete(`/news/${id}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(200);
            response.text.should.include('News removed succesfully');
            done();
          });
      });

      it('page not found', (done) => {
        const id = 10000;
        chai.request(app)
          .get(`/news/${id}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(404);
            response.text.should.include('Novelty not found');
            done();
          });
      });

      it('delete novelty - (invalid token)', (done) => {
        const id = 2;
        chai.request(app)
          .delete(`/news/${id}`)
          .set({ Authorization: `Bearer ${authToken}` })
          .end((err, response) => {
            response.should.have.status(401);
            response.text.should.include('Access denied');
            done();
          });
      });

      it('delete novelty - (no token)', (done) => {
        const id = 2;
        chai.request(app)
          .delete(`/news/${id}`)
          .set({ Authorization: '' })
          .end((err, response) => {
            response.should.have.status(401);
            response.text.should.include('Access denied');
            done();
          });
      });

      it('delete novelty - (expired token)', (done) => {
        const id = 2;
        const oldToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQWd1c3RpbiIsImxhc3ROYW1lIjoiVGFmdXJhIiwiZW1haWwiOiJhZ3VzdGluX3RhZnVyYUB0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MSwiaWF0IjoxNjM5OTQwNjkwLCJleHAiOjE2Mzk5Njk0OTB9.aWxY-Bb5xSCXgzkb6UQRQqEuM5P9j0elwyc-fK7jEy7wj5981pV0fpCwBbgtrFnm3Da1fgqU61YKeZ8bvDUklcL-b4I45_RmPO5YrzZbq5FqyWETpvSHjwoHslnpT4xs-nXf5VOuDr2_OqiwUSTcTCV0byjER0Gw2E2_K_Ui0Mw';
        chai.request(app)
          .delete(`/news/${id}`)
          .set({ Authorization: `Bearer ${oldToken}` })
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.include('Invalid token');
            done();
          });
      });
    });

    describe('GET /news/:id', () => {
      it('get by id - (adminToken)', (done) => {
        const id = 4;
        chai.request(app)
          .get(`/news/${id}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt', 'deletedAt');
            response.body.id.should.be.equal(id);
            done();
          });
      });

      it('page not found', (done) => {
        const id = 10000;
        chai.request(app)
          .get(`/news/${id}`)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(404);
            response.text.should.include('Novelty not found');
            done();
          });
      });
    });

    describe('PUT /news/:id', () => {
      it('update by id - (adminToken)', (done) => {
        const id = 4;
        const novelty = {
          name: 'name changed',
          content: 'Content news 1',
          categoryId: 1
        };
        chai.request(app)
          .put(`/news/${id}`)
          .field('name', novelty.name)
          .field('content', novelty.content)
          .field('categoryId', novelty.categoryId)
          .attach('image', fs.readFileSync('test/imageTest.jpg'), 'imageTest.jpg')
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt', 'deletedAt');
            response.body.id.should.be.equal(id);
            done();
          });
      });

      it('errors list - (adminToken)', (done) => {
        const id = 10000;
        const body = { name: 'name changed' };
        chai.request(app)
          .put(`/news/${id}`)
          .send(body)
          .set({ Authorization: `Bearer ${adminToken}` })
          .end((err, response) => {
            response.body.should.have.property('error');
            response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
            response.should.have.status(400);
            done();
          });
      });

      it('update by id - (invalid token)', (done) => {
        const id = 1;
        const body = {
          name: 'name changed',
          content: 'Content news 1',
          image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        };
        chai.request(app)
          .put(`/news/${id}`)
          .set({ Authorization: `Bearer ${authToken}` })
          .send(body)
          .end((err, response) => {
            response.should.have.status(401);
            response.text.should.include('Access denied');
            done();
          });
      });

      it('update by id - (no token)', (done) => {
        const id = 1;
        const body = {
          name: 'name changed',
          content: 'Content news 1',
          image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        };
        chai.request(app)
          .put(`/news/${id}`)
          .set({ Authorization: '' })
          .send(body)
          .end((err, response) => {
            response.should.have.status(401);
            response.text.should.include('Access denied');
            done();
          });
      });

      it('update by id - (expired token)', (done) => {
        const oldToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQWd1c3RpbiIsImxhc3ROYW1lIjoiVGFmdXJhIiwiZW1haWwiOiJhZ3VzdGluX3RhZnVyYUB0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MSwiaWF0IjoxNjM5OTQwNjkwLCJleHAiOjE2Mzk5Njk0OTB9.aWxY-Bb5xSCXgzkb6UQRQqEuM5P9j0elwyc-fK7jEy7wj5981pV0fpCwBbgtrFnm3Da1fgqU61YKeZ8bvDUklcL-b4I45_RmPO5YrzZbq5FqyWETpvSHjwoHslnpT4xs-nXf5VOuDr2_OqiwUSTcTCV0byjER0Gw2E2_K_Ui0Mw';
        const id = 1;
        const body = {
          name: 'name changed',
          content: 'Content news 1',
          image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        };
        chai.request(app)
          .put(`/news/${id}`)
          .set({ Authorization: `Bearer ${oldToken}` })
          .send(body)
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.include('Invalid token');
            done();
          });
      });
    });
  });
});
