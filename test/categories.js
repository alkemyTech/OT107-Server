/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);
let tokenAdmin;
let tokenStandard;

const userAdmin = {
  email: 'agustin_tafura@test.com',
  password: '123456'
};
const userStandard = {
  email: 'e_musk@test.com',
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

before((done) => {
  chai.request(app)
    .post('/auth/login')
    .send(userStandard)
    .end((err, res) => {
      res.should.have.status(200);
      tokenStandard = res.body.token;
      done();
    });
});

describe('Category Tests', () => {
  describe('GET /categories isAuth', () => {
    it('Invalid Token isAuth [fake Token]', (done) => {
      chai.request(app)
        .get('/categories')
        .set({ Authorization: 'Bearer fakeToken' })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('Invalid Token [no token]', (done) => {
      chai.request(app)
        .get('/categories')
        .set({ Authorization: '' })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('GET /categories isAuth [Admin]', (done) => {
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
    it('GET /categories isAuth [Standard]', (done) => {
      chai.request(app)
        .get('/categories')
        .set({ Authorization: `Bearer ${tokenStandard}` })
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
    it('GET /categorie, categorie does not exist.', (done) => {
      chai.request(app)
        .get('/categorie')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('GET /categories?page=3. [Admin]', (done) => {
      chai.request(app)
        .get('/categories?page=3')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('GET /categories?page=3. [Standard]', (done) => {
      chai.request(app)
        .get('/categories?page=3')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('GET /categories?page=h.', (done) => {
      chai.request(app)
        .get('/categories?page=h')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .end((err, res) => {
          res.text.should.include('The page parameter must be a number.');
          res.should.have.status(400);
          done();
        });
    });
    it('GET /categories?page=.', (done) => {
      chai.request(app)
        .get('/categories?page=')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .end((err, res) => {
          res.text.should.include('You must provide a page number.');
          res.should.have.status(400);
          done();
        });
    });
    it('GET /categories?page=-5.', (done) => {
      chai.request(app)
        .get('/categories?page=-5')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .end((err, res) => {
          res.text.should.include('The page must be greater than one.');
          res.should.have.status(400);
          done();
        });
    });
    it('GET /categories?page=300.', (done) => {
      chai.request(app)
        .get('/categories?page=300')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .end((err, res) => {
          res.text.should.include('The requested page is greater than the last page.');
          res.should.have.status(400);
          done();
        });
    });

    describe('GET categories/:id', () => {
      it('GET categories/:id isAdmin [Admin] id = 1', (done) => {
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
      it('GET categories/:id isAdmin [Standard] id = 1', (done) => {
        chai.request(app)
          .get('/categories/1')
          .set({ Authorization: `Bearer ${tokenStandard}` })
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
      it('GET categories/:id isAdmin [fakeToken] id = 1', (done) => {
        chai.request(app)
          .get('/categories/1')
          .set({ Authorization: 'Bearer fakeToken' })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('GET categories/:id isAdmin [no token] id = 1', (done) => {
        chai.request(app)
          .get('/categories/1')
          .set({ Authorization: '' })
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
      it('GET categories/:id isAdmin [Admin] id = g', (done) => {
        chai.request(app)
          .get('/categories/g')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });
  describe('POST /categories', () => {
    it('POST /categories isAdmin [Admin]', (done) => {
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
    it('POST /categories isAdmin [Standard]', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .send({
          name: 'Nueva Categoria Test',
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
    it('POST /categories isAdmin [fakeToken]', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: 'Bearer faketoken' })
        .send({
          name: 'Nueva Categoria Test',
          description: 'Description de una nueva categoria',
          image: 'image21.jpg',
          updatedAt: new Date(),
          createdAt: new Date(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('POST /categories isAdmin [no token]', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: '' })
        .send({
          name: 'Nueva Categoria Test',
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
    it('POST /categories name is required', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
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
    it('POST /categories, the name must be a string', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
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
    it('POST /categories, the name must be a string', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
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
    it('POST /categories, the name must be a string', (done) => {
      chai.request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
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

  describe('PUT /categories isAdmin', () => {
    it('PUT /categories/2 [Admin] update the name', (done) => {
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
    it("PUT /categories/2 [Standard] Don't update the name", (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .send({ name: 'Update Categoria' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("PUT /categories/2 [fake Token] Don't update the name", (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: 'Bearer fakeToken' })
        .send({ name: 'Update Categoria' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("PUT /categories/2 [no token] Don't update the name", (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: '' })
        .send({ name: 'Update Categoria' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('PUT /categories/2 [Admin] update the description', (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({
          name: 'Update Categoria',
          description: 'Una descripcion'
        })
        .end((err, res) => {
          res.body.should.have.property('id').to.be.equal(2);
          res.body.should.have.property('name').to.be.equal('Update Categoria');
          res.should.have.status(200);
          done();
        });
    });
    it('PUT /categories/2 [Admin] update the image', (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({
          name: 'Update Categoria',
          image: 'imagen.jpg'
        })
        .end((err, res) => {
          res.body.should.have.property('id').to.be.equal(2);
          res.body.should.have.property('name').to.be.equal('Update Categoria');
          res.should.have.status(200);
          done();
        });
    });
    it('PUT /categories/k, the id parameter must be a number.', (done) => {
      chai.request(app)
        .put('/categories/k')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({ name: 'Update Categoria' })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('PUT /categories/2 the category name is required.', (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({ name: '' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('PUT /categories/, :id is required.', (done) => {
      chai.request(app)
        .put('/categories/')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({ name: 'New Category' })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('PUT /categories/456, :id category does not exist.', (done) => {
      chai.request(app)
        .put('/categories/456')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({ name: 'New Category' })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('PUT /categories/2, the name must be a String.', (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({ name: 13245 })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('PUT /categories/2, the name must be a String.', (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({ name: true })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('PUT /categories/2, the name must be a String.', (done) => {
      chai.request(app)
        .put('/categories/2')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send({ name: [] })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('DELETE /categories/:id isAdmin', () => {
    it('DELETE /categories/11 [Admin]', (done) => {
      chai.request(app)
        .delete('/categories/11')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('DELETE /categories/11 [Standard]', (done) => {
      chai.request(app)
        .delete('/categories/11')
        .set({ Authorization: `Bearer ${tokenStandard}` })
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it('DELETE /categories/11 [fakeToken]', (done) => {
      chai.request(app)
        .delete('/categories/11')
        .set({ Authorization: 'Bearer fakeToken' })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('DELETE /categories/11 [no token]', (done) => {
      chai.request(app)
        .delete('/categories/11')
        .set({ Authorization: '' })
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it('DELETE /categories/448', (done) => {
      chai.request(app)
        .delete('/categories/448')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('DELETE /categories/, :id is required.', (done) => {
      chai.request(app)
        .delete('/categories/')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('DELETE /categories/6, It should not be removed, it has an associated novelty', (done) => {
      chai.request(app)
        .delete('/categories/6')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });
});
