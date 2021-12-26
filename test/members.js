const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();

chai.use(chaiHttp);
let tokenAdmin;
let tokenUser;
const tokenInvalid = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0TmFtZSI6IkVsb24iLCJsYXN0TmFtZSI6Ik11c2siLCJlbWFpbCI6ImVfbXVza0B0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MiwiaWF0IjoxNjQwMDMzNjQwLCJleHAiOjE2NDAwNjI0NDB9.MUeeUm_WfSy6LOPgZGbF4jQYRyETURqx7iUQVqB0Pf_naVXjJSThx0mXRcM8MWb2bFv-7zOM0CvCeyhtuPDveSone7mzUzA3oA6Qxhtz_pcCB3huNpugnE1jC0PSw_EDd8OsKl8Z0se0aDmicL5YkURl0aifbyejD4RxqDDBstA';

describe('Members Endpoints', () => {
  const admin = {
    email: 'agustin_tafura@test.com',
    password: '123456'
  };

  const user = {
    email: 'e_musk@test.com',
    password: '123456'
  };

  before((done) => {
    chai.request(server)
      .post('/auth/login')
      .send(admin)
      .end((err, response) => {
        response.should.have.status(200);
        tokenAdmin = response.body.token;
      });
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        tokenUser = response.body.token;
        done();
      });
  });

  describe('GET /members isAdmin', () => {
    it('GET all members - (tokenAdmin)', (done) => {
      chai.request(server)
        .get('/members')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('countMembers');
          res.body.should.have.property('lastPage');
          res.body.should.have.property('previousPage');
          res.body.should.have.property('nextPage');
          res.body.should.have.property('data');
          done();
        });
    });

    describe('GET /members?page=h', () => {
      it('The page parameter must be a number.', (done) => {
        chai.request(server)
          .get('/member?page=h')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
    });

    describe('GET /members?page=" "', () => {
      it('Should take you to page 1', (done) => {
        chai.request(server)
          .get('/members?page=')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.should.have.status(200);
            done();
          });
      });
    });
    describe('GET /categories?page=-5', () => {
      it('The page must be greater than one.', (done) => {
        chai.request(server)
          .get('/members?page=-5')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.should.have.status(500);
            done();
          });
      });
    });
    describe('GET /members?page=300', () => {
      it('The requested page is greater than the last page.', (done) => {
        chai.request(server)
          .get('/members?page=300')
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((err, response) => {
            response.should.have.status(400);
            done();
          });
      });
    });

    it('GET all - (tokenUser)', (done) => {
      chai.request(server)
        .get('/members')
        .set({ Authorization: `Bearer ${tokenUser}` })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error').eq('Access denied');
          done();
        });
    });

    it('GET all - (tokenInvalid)', (done) => {
      chai.request(server)
        .get('/members')
        .set({ Authorization: `Bearer ${tokenInvalid}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error').eq('Invalid token');
          done();
        });
    });

    it('GET all - (no token)', (done) => {
      chai.request(server)
        .get('/members')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error').eq('Access denied');
          done();
        });
    });

    it('page not found', (done) => {
      chai.request(server)
        .get('/member')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /members isAuth', () => {
    it('POST a new member - (tokenAdmin)', (done) => {
      const member = {
        name: 'newMembre',
        facebookUrl: 'urlfacebook',
        instagramUrl: 'instagramUrl',
        linkedinUrl: 'linkedinUrl',
        image: 'image.jpg',
        description: 'a description'
      };
      chai.request(server)
        .post('/members')
        .send(member)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('facebookUrl');
          res.body.should.have.property('instagramUrl');
          res.body.should.have.property('linkedinUrl');
          res.body.should.have.property('image');
          res.body.should.have.property('description');
          res.body.should.have.property('name').eq('newMembre');
          res.body.should.have.property('facebookUrl').eq('urlfacebook');
          res.body.should.have.property('instagramUrl').eq('instagramUrl');
          res.body.should.have.property('linkedinUrl').eq('linkedinUrl');
          res.body.should.have.property('image').eq('image.jpg');
          res.body.should.have.property('description').eq('a description');
          done();
        });
    });

    it('POST a new member - (tokenUser)', (done) => {
      const member = {
        name: 'member',
        image: 'image.jpg',
      };
      chai.request(server)
        .post('/members')
        .send(member)
        .set({ Authorization: `Bearer ${tokenUser}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('image');
          res.body.should.have.property('name').eq('member');
          res.body.should.have.property('image').eq('image.jpg');
          done();
        });
    });

    it('empty member', (done) => {
      const emptyMember = { };
      chai.request(server)
        .post('/members')
        .send(emptyMember)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('errors');
          done();
        });
    });

    it('name required', (done) => {
      const invalidData = {
        name: '',
        image: 'image.jpg'
      };
      chai.request(server)
        .post('/members')
        .send(invalidData)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('errors');
          done();
        });
    });

    it('empty name', (done) => {
      const invalidData2 = {
        name: '',
        image: 'image.jpg'
      };
      chai.request(server)
        .post('/members')
        .send(invalidData2)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('errors');
          done();
        });
    });
  });
  describe('UPDATE the name of member with ID = 2', () => {
    it('Should update the name of member', (done) => {
      const updateMember = {
        name: 'UpdateMember'
      };
      chai.request(server)
        .put('/members/2')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .send(updateMember)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Delete a member with id = 1', () => {
    it('Delete the member with id = 1', (done) => {
      chai.request(server)
        .delete('/members/1')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Dont delete a member', () => {
    it('Dont delete a member that doesnt exist', (done) => {
      chai.request(server)
        .delete('/members/448')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});