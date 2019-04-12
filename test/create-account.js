/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

// eslint-disable-next-line prettier/prettier
describe('Testing for create account endpoint', () => {
  it('sign in user when all fields are provided', (done) => {
    const data = {
      email: 'solomon@yahoo.com',

      password: '123456',
    };
    chai
      .request(app)
      .post('/api/v1/sign-in')
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('first');
        res.body.data.should.have.property('last');
        res.body.data.should.have.property('isAdmin');
        res.body.data.should.have.property('isLoggedIn');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('password');
        res.body.should.have.property('status');
        done();
      });
  });

  it('User should not create account  when first name is not provided', (done) => {
    const data = {
      firstName: '',
      lastName: 'Rock',
      type: 'savings',
      openBalance: 1000,
      email: 'solo@yahoo.com',
    };
    chai
      .request(app)
      .post('/api/v1/create-account')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have
          .property('msg')
          .equal('"firstName" is not allowed to be empty');

        done();
      });
  });

  it('User should not create a user when last name is not provided', (done) => {
    const data = {
      firstName: 'solomon',
      lastName: '',
      type: 'savings',
      openBalance: 1000,
      email: 'solo@yahoo.com',
    };
    chai
      .request(app)
      .post('/api/v1/create-account')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have
          .property('msg')
          .equal('"lastName" is not allowed to be empty');

        done();
      });
  });

  it('User should not create an account when account type is not provided', (done) => {
    const data = {
      firstName: 'solomon',
      lastName: 'Rock',
      type: '',
      openBalance: 1000,
      email: 'solo@yahoo.com',
    };
    chai
      .request(app)
      .post('/api/v1/create-account')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have
          .property('msg')
          .equal('"type" is not allowed to be empty');

        done();
      });
  });

  it('user can create an account when all fields are filled', (done) => {
    const data = {
      firstName: 'solomon',
      lastName: 'Rock',
      type: 'saving',
      openingBalance: 1000,
      email: 'solo@yahoo.com',
    };
    chai
      .request(app)
      .post('/api/v1/create-account')
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('first');
        res.body.data.should.have.property('last');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('Balance');
        res.body.data.should.have.property('userId');
        res.body.data.should.have.property('accNumber');
        res.body.data.should.have.property('status');
        done();
      });
  });
});
