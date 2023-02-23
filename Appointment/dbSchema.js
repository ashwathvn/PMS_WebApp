const mongoose = require('mongoose')
// const moment = require('moment');

const Schema = mongoose.Schema

const AppointmentSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        // default:getDefaultDate
        default:Date.now
    },
    token:{
        type: Number,
        required: true,
        unique:true
    }
})
function getDefaultDate() {
    // const date = new Date(); // create a new Date object
    // const dateString = date.toISOString().slice(0, 10);
    // console.log(dateString)
    // return dateString
return moment().format('MMMM DD YYYY')
}
const Ninja= mongoose.model('Appointment',AppointmentSchema);

module.exports = Ninja;