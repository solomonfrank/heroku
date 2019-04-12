/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

// eslint-disable-next-line prettier/prettier
describe('Testing for signup endpoint', () => {
  it('User should not sign up a user when email is not provided', (done) => {
    const data = {
      firstName: 'solomon',
      lastName: 'Rock',
      password: '1234567',
      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
      .send(data)
      .end((_err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('msg').equal('"email" is required');

        done();
      });
  });

  it('User should not sign up a user when first is not provided', (done) => {
    const data = {
      email: 'solomon@yahoo.com',
      lastName: '',
      firstName: 'Enwerem',
      password: '1234567',
      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
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

  it('User should not sign up a user when last name is not provided', (done) => {
    const data = {
      firstName: 'solomon',
      email: 'solomon@yahoo.com',
      password: '1234567',
      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('msg').equal('"lastName" is required');

        done();
      });
  });

  it('User should not sign up a user when first name is not provided', (done) => {
    const data = {
      email: 'solomon@yahoo.com',
      password: '1234567',
      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('msg').equal('"firstName" is required');

        done();
      });
  });

  it('User should not sign up a user when password is not provided', (done) => {
    const data = {
      firstName: 'solomon',
      email: 'solomon@yahoo.com',
      lastName: 'solomon',

      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('msg').equal('Password do not match');

        done();
      });
  });

  it('User should not sign up a user when passwords do not match', (done) => {
    const data = {
      firstName: 'solomon',
      email: 'solomon@yahoo.com',
      lastName: 'solomon',
      password: '1234567999',
      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('msg').equal('Password do not match');

        done();
      });
  });

  it('User should not sign up a user when first Name do not match', (done) => {
    const data = {
      firstName: '',
      email: 'solomon@yahoo.com',
      lastName: 'solomon',
      password: '1234567999',
      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
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
  it('sign up user when all fields are provided', (done) => {
    const data = {
      firstName: 'solomom',
      email: 'solomon@yahoo.com',
      lastName: 'solomon',
      password: '123456',
      confirmPassword: '123456',
    };
    chai
      .request(app)
      .post('/api/v1/sign-up')
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
        res.body.should.have.property('status');
        done();
      });
  });
});
