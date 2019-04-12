/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import like from 'chai-like';
import things from 'chai-things';
import app from '../index';

chai.should();
chai.use(chaiHttp);
chai.use(like);
chai.use(things);

describe('/fetch all registered account', () => {
  it('get all registered account', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts')

      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.an('array').that.contains.something.property('id');
        res.body.data.should.be.an('array').that.contains.something.property('first');
        res.body.data.should.be.an('array').that.contains.something.property('last');
        res.body.data.should.be.an('array').that.contains.something.property('accNumber');
        res.body.data.should.be.an('array').that.contains.something.property('email');
        res.body.data.should.be.an('array').that.contains.something.property('type');
        res.body.data.should.be.an('array').that.contains.something.property('Balance');

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
