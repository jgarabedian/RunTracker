const express = require('express');
const app = express();
const userRoute = express.Router();
const runRoute = express.Router();

// Run model
let Run = require('../models/Run');

// Add Run
runRoute.route('/create').post((req, res, next) => {
    Run.create(req.body, (error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get All Runs
runRoute.route('/').get((req, res) => {
    Run.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get a single Run
runRoute.route('/read/:id').get((req, res) => {
    Run.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Run
runRoute.route('/update/:id').put((req, res, next) => {
    Run.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.warn(error)
        } else {
            res.json(data)
            console.log('Run updated successfully')
        }
    })
});

// Delete Run
runRoute.route('/delete/:id').delete((req, res, next) => {
    Run.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = runRoute;