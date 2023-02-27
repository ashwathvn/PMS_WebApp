const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const issueSchema = new mongoose.Schema({
    issueid: {
        type: Number,
        required: true,
        unique: true
    },
    issue: {
        type: String,
        enum: ["EPIC", "STORY", "TASK", "IMPROVEMENT"],
        required: true
    },
})

const defectmodel = mongoose.model("issue_types", issueSchema);
module.exports = defectmodel;