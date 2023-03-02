const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const userSchema = new mongoose.Schema({
    empid: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        minLength: 5
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v); // check if the phone number has at least 10 digits
            },
            message: props => `${props.value} is not a valid phone number, should be atleast 10 digits`
        }
    },
    email: {
        type: String,
        required: 'Email address is required',
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'The e-mail can contain words, numbers, underscore, dot and @ {ex:@gmail.com}']
    },
    role: {
        type: String,
        enum: ["Development", "Testing"],
        required: true
    },
    time: {
        type: Date,
        default: () => Date.now()
    }
})

const userInfo = mongoose.model('userInfo', userSchema);
module.exports = userInfo;