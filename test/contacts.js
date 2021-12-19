const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();

chai.use(chaiHttp);
let token;

describe('Contacts API', () => {
  const user = {
    email: 'agustin_tafura@test.com',
    password: '123456'
  };

  before((done) => {
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        token = response.body.token;
        done();
      });
  });

  describe('GET /backoffice/contacts', () => {
    it('It should GET all the contacts', (done) => {
      chai.request(server)
        .get('/backoffice/contacts')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.map((obj) => obj.should.have.all.deep.keys('id', 'name', 'phone', 'email', 'message', 'deletedAt', 'createdAt', 'updatedAt'));
          done();
        });
    });
  });

  it('it should not get the contacts, page not found', (done) => {
    chai.request(server)
      .get('/backoffice')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('it should not get the contacts, page not found', (done) => {
    chai.request(server)
      .get('/backoffice/contacts/1')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  describe('POST /contacts', () => {
    it('It should POST a new contacts', (done) => {
      const contact = {
        name: 'test',
        phone: '123456',
        email: 'test@test.com',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(contact)
        .set({ Authorization: `Bearer ${token}` })
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

    it('It should not post a new contacts, invalid contact', (done) => {
      const invalidContact = { };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('It should not post a new contacts, name required', (done) => {
      const invalidContact1 = {
        phone: '123456',
        email: 'test@test.com',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact1)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('It should not post a new contacts, empty name', (done) => {
      const invalidContact2 = {
        name: '',
        phone: '123456',
        email: 'test@test.com',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact2)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('It should not post a new contacts, email required', (done) => {
      const invalidContact3 = {
        name: 'test',
        phone: '123456',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact3)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });

    it('It should not post a new contacts, empty email', (done) => {
      const invalidContact4 = {
        name: 'test',
        email: '',
        phone: '123456',
        message: 'test',
      };
      chai.request(server)
        .post('/contacts')
        .send(invalidContact4)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('error');
          done();
        });
    });
  });
});
