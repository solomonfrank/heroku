/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
// import app from "../index";

chai.should();
chai.use(chaiHttp);

describe('Testing for signin endpoint', () => {
  it('User should not sign in a user when email is not provided', (done) => {
    const data = {
      email: '',
      password: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/sign-in')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have
          .property('msg')
          .equal('"email" is not allowed to be empty');
        done();
      });
  });

  it('User should not sign in a user when email is not provided', (done) => {
    const data = {
      email: 'solo@yahoo.com',

      password: '',
    };
    chai
      .request(app)
      .post('/api/v1/sign-in')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have
          .property('msg')
          .equal('"password" is not allowed to be empty');

        done();
      });
  });

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
});
