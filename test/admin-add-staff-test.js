/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

// eslint-disable-next-line prettier/prettier
describe('Testing for admin-add-staff endpoint', () => {
  it('superAdmin should not sign up a staff|cashier when email is not provided', (done) => {
    const data = {
      firstName: 'solomon',
      lastName: 'Rock',
      password: '1234567',
      confirmPassword: '1234567',
      email: '',
      type: 'staff',
      isAdmin: true,
    };
    chai
      .request(app)
      .post('/api/v1/add-admin')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have
          .property('msg')
          .equal('"email" is not allowed to be empty');

        done();
      });
  });

  it('Admin should not sign up a user when last is not provided', (done) => {
    const data = {
      email: 'solomon@yahoo.com',
      lastName: '',
      firstName: 'Enwerem',
      password: '1234567',
      confirmPassword: '1234567',
      type: 'staff',
      isAdmin: true,
    };
    chai
      .request(app)
      .post('/api/v1/add-admin')
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

  it('Admin should not sign up a user when password is not provided', (done) => {
    const data = {
      firstName: 'solomon',
      email: 'solomon@yahoo.com',
      lastName: 'solomon',
      password: '',
      type: 'staff',
      isAdmin: true,

      confirmPassword: '1234567',
    };
    chai
      .request(app)
      .post('/api/v1/add-admin')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have
          .property('msg')
          .equal('"password" is not allowed to be empty');

        done();
      });
  });

  it('UserAdmin should not sign up a staff when passwords do not match', (done) => {
    const data = {
      firstName: 'solomon',
      email: 'solomon@yahoo.com',
      lastName: 'solomon',
      password: '1234567999',
      confirmPassword: '1234567',
      type: 'staff',
      isAdmin: '',
    };
    chai
      .request(app)
      .post('/api/v1/add-admin')
      .send(data)
      .end((err, res) => {
        // eslint-disable-next-line no-console

        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have
          .property('msg')
          .equal('"isAdmin" must be a boolean');

        done();
      });
  });

  it('create staff when all fields are provided', (done) => {
    const data = {
      firstName: 'solomom',
      email: 'solomon@yahoo.com',
      lastName: 'solomon',
      password: '123456',
      confirmPassword: '123456',
      type: 'staff',
      isAdmin: true,
    };
    chai
      .request(app)
      .post('/api/v1/add-admin')
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
        res.body.data.should.have.property('type');
        res.body.should.have.property('status');
        done();
      });
  });
});
