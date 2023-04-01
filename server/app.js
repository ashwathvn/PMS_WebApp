
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT", "PATCH");
  // Request headers you wish to allow
  next();
});

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const url = "mongodb://root:root@ac-qhvwcbo-shard-00-00.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-01.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-02.fbiiyif.mongodb.net:27017/DefectTracker?ssl=true&replicaSet=atlas-relxiz-shard-0&authSource=admin&retryWrites=true&w=majority";


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
console.log("Sample")
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