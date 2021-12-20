const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();

chai.use(chaiHttp);
let tokenAdmin;
let tokenUser;
const tokenInvalid = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0TmFtZSI6IkVsb24iLCJsYXN0TmFtZSI6Ik11c2siLCJlbWFpbCI6ImVfbXVza0B0ZXN0LmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyIsInJvbGVJZCI6MiwiaWF0IjoxNjQwMDMzNjQwLCJleHAiOjE2NDAwNjI0NDB9.MUeeUm_WfSy6LOPgZGbF4jQYRyETURqx7iUQVqB0Pf_naVXjJSThx0mXRcM8MWb2bFv-7zOM0CvCeyhtuPDveSone7mzUzA3oA6Qxhtz_pcCB3huNpugnE1jC0PSw_EDd8OsKl8Z0se0aDmicL5YkURl0aifbyejD4RxqDDBstA';

describe('Contacts API', () => {
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

  describe('GET /backoffice/contacts isAdmin', () => {
    it('GET all - (tokenAdmin)', (done) => {
      chai.request(server)
        .get('/backoffice/contacts')
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'phone', 'email', 'message', 'deletedAt', 'createdAt', 'updatedAt'));
          done();
        });
    });

    it('GET all - (tokenUser)', (done) => {
      chai.request(server)
        .get('/backoffice/contacts')
        .set({ Authorization: `Bearer ${tokenUser}` })
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.have.property('error').eq('Access denied');
          done();
        });
    });

    it('GET all - (tokenInvalid)', (done) => {
      chai.request(server)
        .get('/backoffice/contacts')
        .set({ Authorization: `Bearer ${tokenInvalid}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error').eq('Invalid token');
          done();
        });
    });

    it('GET all - (no token)', (done) => {
      chai.request(server)
        .get('/backoffice/contacts')
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.have.property('error').eq('Access denied');
          done();
        });
    });

    it('page not found', (done) => {
      chai.request(server)
        .get('/backoffice')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it('page not found', (done) => {
      chai.request(server)
        .get('/backoffice/contacts/1')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /contacts isAuth', () => {
    it('POST a new contacts - (tokenAdmin)', (done) => {
      const contact = {
        name: 'test',
        phone: '123456',
        email: 'test@test.com',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(contact)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('name');
          response.body.should.have.property('phone');
          response.body.should.have.property('email');
          response.body.should.have.property('message');
          response.body.should.have.property('createdAt');
          response.body.should.have.property('updatedAt');
          response.body.should.have.property('name').eq('test');
          response.body.should.have.property('phone').eq('123456');
          response.body.should.have.property('email').eq('test@test.com');
          response.body.should.have.property('message').eq('test');
          done();
        });
    });

    it('POST a new contacts - (tokenUser)', (done) => {
      const contact = {
        name: 'test',
        phone: '123456',
        email: 'test@test.com',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(contact)
        .set({ Authorization: `Bearer ${tokenUser}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('name');
          response.body.should.have.property('phone');
          response.body.should.have.property('email');
          response.body.should.have.property('message');
          response.body.should.have.property('createdAt');
          response.body.should.have.property('updatedAt');
          response.body.should.have.property('name').eq('test');
          response.body.should.have.property('phone').eq('123456');
          response.body.should.have.property('email').eq('test@test.com');
          response.body.should.have.property('message').eq('test');
          done();
        });
    });

    it('invalid contact', (done) => {
      const invalidContact = { };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('name required', (done) => {
      const invalidContact1 = {
        phone: '123456',
        email: 'test@test.com',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact1)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('empty name', (done) => {
      const invalidContact2 = {
        name: '',
        phone: '123456',
        email: 'test@test.com',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact2)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('email required', (done) => {
      const invalidContact3 = {
        name: 'test',
        phone: '123456',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact3)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('empty email', (done) => {
      const invalidContact4 = {
        name: 'test',
        email: '',
        phone: '123456',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact4)
        .set({ Authorization: `Bearer ${tokenAdmin}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });
  });
});