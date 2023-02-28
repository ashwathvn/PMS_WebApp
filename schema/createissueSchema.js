const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const createIssue = new mongoose.Schema({
    // createissueid: {
    //     type: Number,
    //     required: true
    // },
    Title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assigne: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    label: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    }

})

const issueDB = mongoose.model('createiissue', createIssue)
module.exports = issueDB;