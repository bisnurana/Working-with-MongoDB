const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');
describe('Driver controller', () => {
  it('Post request to /api/driver', (done) => {
    Driver.count().then((count) => {
      request(app)
        .post('/api/driver')
        .send({ email: 'email@email.com' })
        .end(() => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
          });
          done();
        });
    });
  });
  it('Update driver to /api/driver/:id', (done) => {
    const driver = new Driver({ email: 'test@test.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/driver/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 'test@test.com' }).then((driver) => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });
  it('delete to /api.driver/:id', (done) => {
    const driver = new Driver({ email: 'test@test.com', driving: false });
    driver.save().then(() => {
      request(app)
        .delete(`/api/driver/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test@test.com' }).then((driver) => {
            assert(driver === null);
            done();
          });
        });
    });
  });
  it('get drivers located near 20000 or 20km /api/driver', (done) => {
    const helsinkiDriver = new Driver({
      email: 'helsinki@test.com',
      geometry: {
        coordinates: [24, 60],
      },
    });
    const espooDriver = new Driver({
      email: 'espoo@test.com',
      geometry: {
        coordinates: [40.59392, 80.65872362],
      },
    });
    Promise.all([helsinkiDriver.save(), espooDriver.save()]).then(() => {
      request(app)
        .get('/api/driver?lng=24.001&lat=60.002')
        .end((err, response) => {
          assert(response.body[0].email === 'helsinki@test.com');
          assert(response.body.length === 1);
          done();
        });
    });
  });
});
