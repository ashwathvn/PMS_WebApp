const mongoose = require('mongoose');
const express = require('express')

const app = express()
app.use(express.json())
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const uri = "mongodb://root:root@ac-qhvwcbo-shard-00-00.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-01.fbiiyif.mongodb.net:27017,ac-qhvwcbo-shard-00-02.fbiiyif.mongodb.net:27017/Patient?ssl=true&replicaSet=atlas-relxiz-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, connectionParams, (err) => {
    if (err) {
        console.log("Database connection failed", err)
    } else {
        console.log("Database connection success")
    }
})

const patientschema = new mongoose.Schema({
    qid: Number,
    name: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    dob: {
        type: Date,
        required: true,
        // default: () => Date.now(),
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 7
    },
    phone: {
        type: Number,
        min: 10,
    },
    doctor: String,
    identity: {
        type: String,
        enum: ["aadhar", "license", "passport"],
        required: true
    },
    location: { type: String, possibleValues: ['Banglore', 'Kochi', 'Manglore', 'Chennai'] }
})

const patientmodel = mongoose.model("patient_details", patientschema);

//Add new patient
app.post('/newpatient', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "12345") {
        const data = new patientmodel({
            qid: req.body.qid,
            name: req.body.name,
            gender: req.body.gender,
            dob: req.body.dob,
            email: req.body.email,
            phone: req.body.phone,
            doctor: req.body.doc,
            identity: req.body.identity,
        });

        const val = await data.save();
        res.json(val)
    } else {
        res.send("Authorization failture, token not found")
    }
})


//Get all patients
app.get('/allpatients', function (req, res) {
    const authHeader = req.headers.authorization;
    if (authHeader === "12345") {
        patientmodel.find((err, val) => {
            if (err) {
                console.log("Error", err)
            }
            res.json(val)
        })
    } else {
        res.send("Authorization failture, token not found")
    }
})

//Get one patient
app.get('/patient/:id', function (req, res) {
    let fetchid = req.params.id;
    const authHeader = req.headers.authorization;
    if (authHeader === "12345") {
        patientmodel.find(({ qid: fetchid }), (err, val) => {
            if (err) {
                console.log("Error", err)
            } else {
                if (val.length == 0) {
                    res.send("Data not found")
                } else {
                    res.send(val)
                }
            }
        })
    } else {
        res.send("Authorization failture, token not found")
    }
})

//Update a patient
app.put('/updatepatient/:id', async (req, res) => {
    let uid = req.params.id;
    let uname = req.body.name;
    let ugender = req.body.gender;
    let udob = req.body.dob;
    let uemail = req.body.email;
    let uphone = req.body.phone;
    let udoctor = req.body.doc;

    const authHeader = req.headers.authorization;
    if (authHeader === "12345") {
        patientmodel.findOneAndUpdate({ id: uid },
            {
                $set: {
                    name: uname,
                    gender: ugender,
                    dob: udob,
                    email: uemail,
                    phone: uphone,
                    doctor: udoctor,
                }
            },
            { new: true }, (err, data) => {
                if (err) {
                    res.send("Error")
                } else {
                    if (data == null) {
                        res.send("Nothing found")
                    }
                    else {
                        res.send(data)
                    }
                }
            })
    } else {
        res.send("Authorization failture, token not found")
    }
})

//Deleting a patient
app.delete('/delete/:id', async (req, res) => {
    let deleteid = req.params.id;
    const authHeader = req.headers.authorization;
    if (authHeader === "12345") {
        patientmodel.findOneAndDelete(({ qid: deleteid }), function (err, data) {
            if (err) {
                res.send(err)
            } else {
                if (data == null) {
                    res.send("Data not found")
                } else {
                    res.send(data)
                }
            }
        })
    } else {
        res.send("Authorization failture, token not found")
    }
})

//Update all patients
app.put('/updateall', async (req, res) => {
    let uidentity = req.body.identity;
    const authHeader = req.headers.authorization;
    if (authHeader === "12345") {
        patientmodel.updateMany({
            // name: /^M/
        },
            {
                $set: {
                    identity: uidentity,
                }
            },
            { new: true }, (err, data) => {
                if (err) {
                    res.send("Error")
                } else {
                    res.send(data)
                }
            })
    } else {
        res.send("Authorization failture, token not found")
    }
})

//Delete all patients
app.delete('/deleteall', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "12345") {
        patientmodel.deleteMany(
            // { doctor: 'Pooja Kumar' }
        ).then((data) => {
            res.send(data)
            // res.send("All patients with doctor Pooja Kumar deleted");
        }).catch((error) => {
            res.send(error);
        });
    } else {
        res.send("Authorization failture, token not found")
    }
})

// app.listen(3000, function () {
//     console.log("Server started at http://localhost:3000")
// })

module.exports = app;