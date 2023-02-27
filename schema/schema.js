const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const userSchema = new mongoose.Schema({
    empid: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["development", "Testing"],
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})


const userInfo = mongoose.model('userInfo', userSchema);

//create Issue
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


module.exports = {issueDB,debugmodel,defectmodel,userInfo}
