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
                        assert(count + 1 === newCount)
                    });
                    done();
                });
        });
    });
    it('Update driver to /api/driver/:id', (done) => {
        const driver = new Driver({ email: "test@test.com", driving: false });
        driver.save()
            .then(() => {
                request(app)
                    .put('/api/driver/' + driver._id)
                    .send({ driving: true })
                    .end(() => {
                        Driver.findOne({ email: "test@test.com" })
                            .then(driver => {
                                assert(driver.driving === true);
                                done();
                            });
                    });
            });
    });
    it('delete to /api.driver/:id', (done) => {
        const driver = new Driver({ email: "test@test.com", driving: false });
        driver.save()
            .then(() => {
                request(app)
                    .delete('/api/driver/' + driver._id)
                    .end(() => {
                        Driver.findOne({ email: "test@test.com" })
                            .then((driver) => {
                                assert(driver === null);
                                done();
                            });
                    });
            });
    });

});