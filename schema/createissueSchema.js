const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const createIssue = new mongoose.Schema({
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
    }

})

const issueDB = mongoose.model('createiissue', createIssue)
module.exports = issueDB;