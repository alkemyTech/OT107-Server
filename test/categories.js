/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);
let token;

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
      token = res.body.token;
      done();
    });
});

describe('Category Tests', () => {
  describe('GET /categories', () => {
    it('Invalid Token', (done) => {
      chai.request(app)
        .get('/categories')
        .set({ Authorization: 'Bearer fakeToken' })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('it should get the categories data', (done) => {
      chai.request(app)
        .get('/categories')
        .set({ Authorization: `Bearer ${token}` })
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
    it('Category data should not be retrieved, categorie does not exist.', (done) => {
      chai.request(app)
        .get('/categorie')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('You should get the category data on page 3.', (done) => {
      chai.request(app)
        .get('/categories?page=3')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('The page parameter must be a number.', (done) => {
      chai.request(app)
        .get('/categories?page=h')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.text.should.include('The page parameter must be a number.');
          res.should.have.status(400);
          done();
        });
    });
    it('You must provide a page number.', (done) => {
      chai.request(app)
        .get('/categories?page=')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.text.should.include('You must provide a page number.');
          res.should.have.status(400);
          done();
        });
    });
    it('The page must be greater than one.', (done) => {
      chai.request(app)
        .get('/categories?page=-5')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.text.should.include('The page must be greater than one.');
          res.should.have.status(400);
          done();
        });
    });
    it('The requested page is greater than the last page.', (done) => {
      chai.request(app)
        .get('/categories?page=300')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.text.should.include('The requested page is greater than the last page.');
          res.should.have.status(400);
          done();
        });
    });

    describe('GET categories/:id  id = 1', () => {
      it('Should get the category whith id = 1', (done) => {
        chai.request(app)
          .get('/categories/1')
          .set({ Authorization: `Bearer ${token}` })
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
      it("Should't get the category whith id = g", (done) => {
        chai.request(app)
          .get('/categories/g')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });

  describe('POST /categories', () => {
    it('Should insert a category', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
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
    it('The name parameter is required', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: '',
          description: 'Description de una nueva categoria',
          image: 'image21.jpg',
          updatedAt: new Date(),
          createdAt: new Date(),
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('It should not be registered, the name must be a string', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 45421,
          description: 'Description de una nueva categoria',
          image: 'image21.jpg',
          updatedAt: new Date(),
          createdAt: new Date(),
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('It should not be registered, the name must be a string', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: false,
          description: 'Description de una nueva categoria',
          image: 'image21.jpg',
          updatedAt: new Date(),
          createdAt: new Date(),
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('It should not be registered, the name must be a string', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: [],
          description: 'Description de una nueva categoria',
          image: 'image21.jpg',
          updatedAt: new Date(),
          createdAt: new Date(),
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('UPDATE the name of category with ID = 2', () => {
    it('Should update the name of category', (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 'Update Categoria' })
        .end((err, res) => {
          res.body.should.have.property('id').to.be.equal(2);
          res.body.should.have.property('name').to.be.equal('Update Categoria');
          res.should.have.status(200);
          done();
        });
    });
    it("Should't update category, the id parameter must be a number.", (done) => {
      chai.request(app)
        .put('/categories/k')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 'Update Categoria' })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("It shouldn't update, the category name is required.", (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: '' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('The id parameter :id is required.', (done) => {
      chai.request(app)
        .put('/categories/')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 'New Category' })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('It should not update, id category does not exist.', (done) => {
      chai.request(app)
        .put('/categories/456')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 'New Category' })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("It shouldn't update, the name must be a String.", (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 13245 })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("It shouldn't update, the name must be a String.", (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: true })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("It shouldn't update, the name must be a String.", (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: [] })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('DELETE /categories', () => {
    it('Should delete the category with id = 11', (done) => {
      chai.request(app)
        .delete('/categories/11')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('You cannot delete a category that is out of range.', (done) => {
      chai.request(app)
        .delete('/categories/448')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('The id parameter :id is required.', (done) => {
      chai.request(app)
        .delete('/categories/')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('It should not be removed, it has an associated novelty', (done) => {
      chai.request(app)
        .delete('/categories/6')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });
});
