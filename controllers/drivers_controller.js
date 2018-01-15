const Driver = require('../models/driver');
module.exports = {
    greeting(req, res) {
        res.send({ hi: 'Awesome! You are here' })
    },
    index(req, res, next) {
        const { lng, lat } = req.query;
        Driver.geoNear(
            { type: 'point', coordinates: [lng, lat] },
            { spherical: true, maxDistance: 20000 }
        ).then(drivers => {
            res.send(drivers)
        }).catch(next);
    }
    ,
    create(req, res, next) {
        console.log(req.body);
        const driverProps = req.body;
        Driver.create(driverProps)
            .then((driver) => {
                res.send(driver)
            }).catch(next);
    },
    update(req, res, next) {
        const id = req.params.id;
        const driverProps = req.body;
        Driver.findByIdAndUpdate(id, driverProps)
            .then(() => { Driver.findById({ _id: id }) })
            .then(driver => res.send(driver)).catch(next);
    },
    delete(req, res, next) {
        const id = req.params.id;
        Driver.findByIdAndRemove({ _id: id })
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }
};