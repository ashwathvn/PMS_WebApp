const express = require('express')
const app=express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const database=module.exports =() =>{
    const connection={
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try{
        mongoose.connect("mongodb://root:root@ac-qhvwcbo-shard-00-00.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-01.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-02.fbiiyif.mongodb.net:27017/Patient?ssl=true&replicaSet=atlas-relxiz-shard-0&authSource=admin&retryWrites=true&w=majority"
            ,connection)
// mongoose.connect('mongodb://localhost:27017/ninjadb')
// mongoose.connect('mongodb://localhost/AppointmentOfDoc' , connection)
mongoose.Promise = global.Promise;
  console.log('db connected')
    }catch(err){
        console.log(err)
    }
}
database()

app.use(bodyParser.json())

app.use('/',require('./Appointment/api'))
app.use('/',require('./doctor'))
app.use('/',require('./index'))

app.use((err,req,res,next)=>{
    // console.log(err)
    res.status(422).send({error:err.message})
})

app.listen(4000,()=>{
    console.log('server is running')
})