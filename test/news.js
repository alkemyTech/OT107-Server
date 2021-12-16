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
    const pageValue = [0, 1, 2, 3, 4, 5, 10000, 'a', ''];
    pageValue.forEach((page) => {
      it('It should return news list or correct errors msg', (done) => {
        chai.request(app)
          .get(`/news?page=${page}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (response.status === 400) {
              if (page === 'a') { response.text.should.include('The page parameter must be a number.'); }
              if (page === '') { response.text.should.include('You must provide a page number.'); }
              if (page === 0) { response.text.should.include('The page must be greater than one.'); }
              if (page > 0) { response.text.should.include('The requested page is greater than the last page.'); }
            } else {
              response.should.have.status(200);
              response.should.be.a('object');
              response.body.should.have.keys('countNews', 'lastPage', 'previousPage', 'nextPage', 'data');
              response.body.data.should.have.lengthOf.within(1, 10);
              response.body.data.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'content', 'image', 'categoryId'));
            }
            done();
          });
      });
    });
  });

  describe('POST /news', () => {
    const news = [
      {
        msg: 'It should returns the noelty created',
        novelty: {
          name: 'News testing',
          content: 'Content news testing',
          image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        }
      },
      {
        msg: 'It should returns an error - can\'t creat a news without name',
        novelty: {
          content: 'Content news testing',
          image: 'http://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        }
      }
    ];
    news.forEach((obj) => {
      it(obj.msg, (done) => {
        chai.request(app)
          .post('/news')
          .send(obj.novelty)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (response.status === 400) {
              response.body.should.have.property('error');
              response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
            } else {
              response.should.have.status(200);
              response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt');
            }
            done();
          });
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
    const news = [
      { id: 4, msg: 'It should returns a novelty if exist the id in DB' },
      { id: 10000, msg: 'It should returns a bad request status 500' }
    ];
    news.forEach((novelty) => {
      it(novelty.msg, (done) => {
        chai.request(app)
          .get(`/news/${novelty.id}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (response.status === 500) {
              response.text.should.include('Error: bad request');
            } else {
              response.should.have.status(200);
              response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt', 'deletedAt');
              response.body.id.should.be.equal(novelty.id);
            }
            done();
          });
      });
    });
  });

  describe('PUT /news/:id', () => {
    const news = [
      {
        msg: 'It should returns the novelty updated if exist the id in DB',
        id: 4,
        body: {
          name: 'name changed',
          content: 'Content news 1',
          image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
          categoryId: 1
        }
      },
      {
        msg: 'It should returns a bad request status 400',
        id: 10000,
        body: { name: 'name changed' }
      }
    ];
    news.forEach((novelty) => {
      it(novelty.msg, (done) => {
        chai.request(app)
          .put(`/news/${novelty.id}`)
          .send(novelty.body)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (response.status === 400) {
              response.body.should.have.property('error');
              response.body.error.map((err) => err.should.deep.keys('msg', 'param', 'location'));
            } else {
              response.should.have.status(200);
              response.body.should.be.a('object').with.keys('id', 'name', 'content', 'image', 'categoryId', 'updatedAt', 'createdAt', 'deletedAt');
              response.body.id.should.be.equal(novelty.id);
            }
            done();
          });
      });
    });
  });
});
