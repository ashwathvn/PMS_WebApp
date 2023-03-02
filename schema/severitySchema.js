const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const severitySchema = new mongoose.Schema({
    severityid: {
        type: Number,
        required: true,
        unique: true
    },
    severity: {
        type: String,
        required: true,
        enum: ["HIGH", "MEDIUM", "LOW", "STOPPER"]
    },

})

const severitymodel = mongoose.model("severity", severitySchema);

module.exports = severitymodel;