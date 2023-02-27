const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const statusSchema = new mongoose.Schema({
    sid: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "In progress", "To be tested", "Closed", "Reopen"]
    }

})

const debugmodel = mongoose.model("bug_status", statusSchema);
module.exports = debugmodel;