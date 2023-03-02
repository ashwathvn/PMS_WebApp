const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Use process.env to access environment variables defined in .env file


mongoose.connect(process.env.MONGODB_URL /* || "mongodb://localhost/AppointmentOfDoc" */, connectionParams, (err) => {
    if (err) {
        console.log("Database connection failed", err.message);
        console.log(__dirname)
    } else {
        console.log("Database connection success");
    }
})

app.use(bodyParser.json())

app.use('/', require('../api/apiCreateIssue'))
app.use('/', require('../api/apiIssue'))
app.use('/', require('../api/apiStatus'))
app.use('/', require('../api/apiUser'))
app.use('/', require('../api/apiSeverity'))

app.listen(process.env.PORT || 4000, function () {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
})
