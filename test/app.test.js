const knex = require('../db/knex');

describe('CRUD States', () => {
  before((done) => {
    //run migrations
    knex.migrate.latest()
      .then(() => {
        //run seeds
        return knex.seed.run();
      }). then(() => done());
  });

  it('Lists all Records', (done) => {
    request(app)
      .get('/api/vi/states')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.states);
        done();
      });
  });
  it('Show one record by id', (done) => {
    request(app)
      .get('/api/vi/states/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.states[0]);
        done();
      });
  });

  it('Creates a record', (done) => {
    request(app)
      .post('/api/v1/states')
      .send(fixtures.state)       //sending data
      .set('Accept', 'application/json')   //want json returned
      .expect('Content-Type', /json/)     //expects json
      .expect(200)                      //status code
      .then((response) => {
          expect(response.body).to.be.a('object');
          fixtures.state.id = response.body.id;
          expect(response.body).to.deep.equal(fixtures.state);  //the thing that gets created
          done();
      });
  });
  it('Updates a record', (done) => {
    request(app)
      .put('/api/v1/states/')
      .send(fixtures.state)       //sending data
      .set('Accept', 'application/json')   //want json returned
      .expect('Content-Type', /json/)     //expects json
      .expect(200)                      //status code
      .then((response) => {
          expect(response.body).to.be.a('object');
          fixtures.state.id = response.body.id;
          expect(response.body).to.deep.equal(fixtures.state);  //the thing that gets created
          done();
      });
  });

  it('Deletes a record', (done) => {
    request(app)
      .delete('/api/v1/states/')
      .set('Accept', 'application/json')   //want json returned
      .expect('Content-Type', /json/)     //expects json
      .expect(200)                      //status code
      .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body).to.deep.equal({
            deleted: true
          });
          done();
      });
  });

});
