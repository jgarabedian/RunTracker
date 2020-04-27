const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
let Run = new Schema ({
    date: {
        type: Date
    },
    miles: {
        type: Number
    },
    time_of_day: {
        type: String
    },
    distance: {
        type: String
    },
    pace_mins: {
        type: Number
    },
    pace_secs: {
        type: Number
    },
    // user FK
    user_id: {
        type: String
    }
}, {
    collection: 'runs'
});

module.exports = mongoose.model('Run', Run)