/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('/get for a specific account', () => {
  it('sign in user when all fields are provided correctly', (done) => {
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


  it('get a specific user account profile if correct account number is  provided correctly', (done) => {
    const accountNumber = 5555555;

    chai
      .request(app)
      .get(`/api/v1/accounts/${accountNumber}`)

      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('first');
        res.body.data.should.have.property('last');
        res.body.data.should.have.property('userId');
        res.body.data.should.have.property('Balance');
        res.body.data.should.have.property('status');
        res.body.data.should.have.property('accNumber');
        res.body.should.have.property('status');
        done();
      });
  });
  it('return not found if user enter non-existing acc number', (done) => {
    const accountNumber = 666;

    chai
      .request(app)
      .get(`/api/v1/accounts/${accountNumber}`)

      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data').equal('account not found');


        done();
      });
  });
});
