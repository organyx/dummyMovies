const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Movies', () => {
  describe('GET /', () => {
    // Test to get all movies
    it('should get all movies', done => {
      chai
        .request(app)
        .get('/api/movies/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('GET /movie/1', () => {
    // Test to get single movie
    it('should get a single movie', done => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/movies/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('title');
          res.body.title.should.equal('Lion King');
          done();
        });
    });
  });

  describe('GET /movie/5', () => {
    // Test to get single student record
    it('should NOT get a single movie', done => {
      const id = 5;
      chai
        .request(app)
        .get(`/api/movies/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('Movie ID does not exist');
          done();
        });
    });
  });

  describe('GET /api/foo/bar', () => {
    // Test to get to unknown route
    it('should get to unknown route', done => {
      chai
        .request(app)
        .get('/api/foo/bar')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('You are lost');
          done();
        });
    });
  });

  describe('POST /api/movies', () => {
    // Test to add a new movie
    it('should add a new movie', done => {
      chai
        .request(app)
        .post('/api/movies')
        .send({ title: 'Hacuna', genre: 'Matata' })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('The movie #3 has been created');
          done();
        });
    });
  });

  describe('POST /api/movies', () => {
    // Test Not to add a new movie
    it('should NOT add a new movie', done => {
      chai
        .request(app)
        .post('/api/movies')
        .send({ title: '', genre: 'Matata' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('Fields are filled incorrectly');
          done();
        });
    });
  });

  describe('PUT /api/movies', () => {
    it('should update a movie #2', done => {
      chai
        .request(app)
        .put(`/api/movies/${2}`)
        .send({ title: 'Hacuna', genre: 'Matata' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('The movie #2 has been updated');
          res.body.content.title.should.equal('Hacuna');
          done();
        });
    });
  });

  describe('PUT /api/movies', () => {
    it('should NOT update a movie #2', done => {
      chai
        .request(app)
        .put(`/api/movies/${2}`)
        .send({ title: 'Hacuna', genre: '' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('Fields are filled incorrectly');
          done();
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete a movie #2', done => {
      chai
        .request(app)
        .delete(`/api/movies/${2}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('The movie #2 has been deleted');
          done();
        });
    });
  });
});
