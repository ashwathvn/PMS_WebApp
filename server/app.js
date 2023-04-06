
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()
var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.use(bodyParser.json())
app.use('/', require('../api/apiCreateIssue'))
app.use('/', require('../api/apiIssue'))
app.use('/', require('../api/apiStatus'))
app.use('/', require('../api/apiUser'))
app.use('/', require('../api/apiSeverity'))
app.use('/', require('../api/apiProject'))

app.listen(4000, function () {
  console.log(`Server started at http://localhost:4000`);
})
module.exports = app;