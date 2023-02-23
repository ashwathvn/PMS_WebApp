const express = require('express')
const router = express.Router()
const DB = require('./dbSchema')
// const moment = require('moment');


router.post('/appointment', (req, res) => {

    DB.create(req.body).then((db) => {
        res.send({ db })
    }).catch((err)=>{console.log(err)})
})

router.get('/appointment', (req, res, next) => {
    DB.find({}).then((db) => {
        res.send({ db })
    })
        .catch((err) => { { console.log(err) } })
})


router.get('/appointment/:token', (req, res, next) => {
    const id = req.params.token;
    DB.find({ token: id }).then((db) => {
        res.send({ db })
    })
})
/*
app.get('/myapi', function(req, res) {
  MyModel.findOne({}, function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      const formattedDate = moment(doc.myDate).format('YYYY-MM-DD');
      res.send(formattedDate);
    }
  });
});

*/
//update in db
router.put('/appointment/:token', (req, res,next) => {
  DB.findOneAndUpdate({token: req.params.token}, req.body
      ).then(()=>{
      DB.findOne({token: req.params.token}).then((db)=>{
          res.send(db)
      })
  }) }) 

//delete in db
router.delete('/appointment/:token', (req, res,next) => {
 DB.findOneAndRemove({token: req.params.token}).then((db)=>{
  res.send(db)
 }).catch(next) 
})



module.exports = router;