const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);
let tokenAdmin;

const userAdmin = {
  email: 'agustin_tafura@test.com',
  password: '123456'
};

before((done) => {
  chai.request(app)
    .post('/auth/login')
    .send(userAdmin)
    .end((err, res) => {
      res.should.have.status(200);
      tokenAdmin = res.body.token;
      done();
    });
});

describe('Category Tests', () => {
  describe('GET /categories', () => {
    it('it should get the categories data', (done) => {
      chai.request(app)
        .get('/categories')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('count');
          res.body.should.have.property('lastPage');
          res.body.should.have.property('previousPage');
          res.body.should.have.property('nextPage');
          res.body.should.have.property('data');
          done();
        });
    });
    describe('GET /categorie', () => {
      it('Category data should not be retrieved, categorie does not exist.', (done) => {
        chai.request(app)
          .get('/categorie')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
    });
    describe('GET /categories?page=h', () => {
      it('The page parameter must be a number.', (done) => {
        chai.request(app)
          .get('/categories?page=h')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.text.should.include('The page parameter must be a number.');
            done();
          });
      });
    });
    describe('GET /categories?page=" "', () => {
      it('You must provide a page number.', (done) => {
        chai.request(app)
          .get('/categories?page=')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.text.should.include('You must provide a page number.');
            done();
          });
      });
    });
    describe('GET /categories?page=-5', () => {
      it('The page must be greater than one.', (done) => {
        chai.request(app)
          .get('/categories?page=-5')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.text.should.include('The page must be greater than one.');
            done();
          });
      });
    });
    describe('GET /categories?page=300', () => {
      it('The requested page is greater than the last page.', (done) => {
        chai.request(app)
          .get('/categories?page=300')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.text.should.include('The requested page is greater than the last page.');
            done();
          });
      });
    });

    describe('GET categories/:id  id = 1', () => {
      it('Should get the category whith id = 1', (done) => {
        chai.request(app)
          .get('/categories/1')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.category.should.have.property('id').eq(1);
            res.body.category.should.have.property('name');
            res.body.category.should.have.property('description');
            res.body.category.should.have.property('image');
            done();
          });
      });
    });
    describe('UPDATE the name of category with ID = 2', () => {
      it('Should update the name of category', (done) => {
        chai.request(app)
          .put('/categories/2')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .send({ name: 'Update Categoria' })
          .end((err, res) => {
            res.body.should.have.property('id').to.be.equal(2);
            res.body.should.have.property('name').to.be.equal('Update Categoria');
            res.should.have.status(200);
            done();
          });
      });
    });
    describe('Insert a category', () => {
      it('Should insert a category', (done) => {
        chai.request(app)
          .post('/categories')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .send({
            name: 'Nueva Categoria Test',
            description: 'Description de una nueva categoria',
            image: 'image21.jpg',
            updatedAt: new Date(),
            createdAt: new Date(),
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    describe('Delete a category with id = 5', () => {
      it('Should delete the category with id = 5', (done) => {
        chai.request(app)
          .delete('/categories/5')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.should.have.status(200);
            done();
          });
      });
      it('It should not delete a category that does not exist', (done) => {
        chai.request(app)
          .delete('/categories/448')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
    });
  });
});
