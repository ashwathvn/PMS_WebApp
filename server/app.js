
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');


const app = express()
var cors = require('cors');


var router = express();
router.use(express.json());
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

app.use(cors());

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const url = 'mongodb://127.0.0.1/new_bugtracker1';


mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Database connection success');
  })
  .catch((err) => {
    console.log('Database connection failed', err);
  });


const path = require('path');
router.use(express.static(path.join(__dirname, '../public')));

app.use(express.static(path.join(__dirname, '../public')));

// Use process.env to access environment variables defined in .env file




router.use(bodyParser.json())

router.use('/', require('../api/apiCreateIssue'))
router.use('/', require('../api/apiIssue'))
router.use('/', require('../api/apiStatus'))
router.use('/', require('../api/apiUser'))
router.use('/', require('../api/apiSeverity'))
router.use('/', require('../api/apiProject'))

router.listen(4000, function () {
    console.log(`Server started at http://localhost:4000`);
})
module.exports = router;