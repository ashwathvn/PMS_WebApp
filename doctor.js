const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const url = "mongodb://root:root@ac-qhvwcbo-shard-00-00.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-01.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-02.fbiiyif.mongodb.net:27017/Patient?ssl=true&replicaSet=atlas-relxiz-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(url, connectionParams, (err) => {
    if (err) {
        console.log("Database connection failed", err);
    } else {
        console.log("Database connection success");
    }
})

const doctorschema = new mongoose.Schema({
    qid: {
        type:Number,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 7
    },
    
    specilization:{
        type:[String],
        enum: ["Orthopedics", "Dermatology", "Pediatrics"],
        required: true
    },
    time:{
        type:Date,
        default:Date.now
    }
})

const doctormodel = mongoose.model("doctor_details", doctorschema);

//Add new doctor
app.post('/newdoctor', async (req, res) => {
    const data = new doctormodel({
        qid: req.body.qid,
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        specilization: req.body.specilization,
        time:req.body.time
    });

    const val = await data.save();
    res.json(val)
})

app.get('/alldoctor', function (req, res) {
    const auth=req.headers.authorization;
    if(auth==="12345"){
        doctormodel.find((err,val)=>{
        if(err){
            console.log("Error",err);
        }
        res.json(val);
    })
    }
     else{
        res.send("Authorization failure,token not found");

}
})


//Get details of doctor
app.get('/doctor/:id', function (req, res) {
    let fetchid = req.params.id;
    doctormodel.find(({ qid: fetchid }), (err, val) => {
        if (err) {
            console.log("Error", err);
        } else {
            if (val.length == 0) {
                res.send("Data not found");
            } else {
                res.send(val);
            }
        }
    })
})

//Update a doctor
app.put('/updatedoctor/:id', async (req, res) => {
    let uid = req.params.id;
    let uname = req.body.name;
    let ugender = req.body.gender;
    let udob = req.body.dob;
    let uemail = req.body.email;
    let udoctor = req.body.specilization;
    let dtime=req.body.time;

    doctormodel.findOneAndUpdate({ id: uid },
        {
            $set: {
                name: uname,
                gender: ugender,
                dob: udob,
                email: uemail,
                specilization: udoctor,
                time:dtime
            }
        },
        { new: true }, (err, data) => {
            if (err) {
                res.send("Error");
            } else {
                if (data == null) {
                    res.send("Nothing found");
                }
                else {
                    res.send(data);
                }
            }
        })
})

//Deleting a doctor
app.delete('/delete/:id', async (req, res) => {
    let deleteid = req.params.id;
    doctormodel.findOneAndDelete(({ qid: deleteid }), function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data == null) {
                res.send("Data not found");
            } else {
            
                res.send(data);
            }
        }
    })
})

// app.listen(3000, function () {
//     console.log("Server started at http://localhost:3000");
// })

module.exports = app;