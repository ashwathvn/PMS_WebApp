const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const userSchema = new mongoose.Schema({
    empid: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["development", "Testing"],
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})


const userInfo = mongoose.model('userInfo', userSchema);

// app.post('/user',  (req, res) => {
//     const newUser = new userInfo(req.body);
//     newUser.save()
//         .then(db => res.send({ db }))
//         .catch(err => console.log(err));
// });





//sony


const schema = new mongoose.Schema({
    issueid: Number,
    issue: {
        type: String,
        enum: ["EPIC", "STORY", "TASK", "IMPROVEMENT"],
        required: true
    },
})

const defectmodel = mongoose.model("issue_types", schema);

//nidhi




const debugschema = new mongoose.Schema({
    sid: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "In progress", "To be tested", "Closed", "Reopen"]
    }

})

const debugmodel = mongoose.model("bug_details", debugschema);


//create Issue
const createIssue = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assigne: {
        type: String,
        required: true
    },

    issue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

})


const issueDB = mongoose.model('createiissue', createIssue)


module.exports = {issueDB,debugmodel,defectmodel,userInfo}

// app.post('/createissue', (req, res) => {
//     const { sid } = req.body; // getting unique data from postman
//     const { issueid } = req.body; // getting unique data from postman
//     const { empid } = req.body; // getting unique data from postman

// var status
// var issue
// var role

//     debugmodel.findOne({ sid }, (err, user) => {  //User is a different collection in database
//         if (err) {
//             res.status(400).send({ error: err })
//         } else if (!user) {
//             res.status(404).send({ error: 'User not found' })
//         } else {
//             const userDatas = { status: user.status };
//             status= userDatas.status
//         }
//     })


//     defectmodel.findOne({ issueid }, (err, user) => {  //User is a different collection in database
//         if (err) {
//             res.status(400).send({ error: err })
//         } else if (!user) {
//             res.status(404).send({ error: 'User not found' })

//         } else {
//             const userDatas = { issue: user.issue };
//             issue = userDatas.issue
//         }
//     })


//     userInfo.findOne({ empid }, (err, user) => {
//         if (err) {
//             res.status(400).send({ error: err })
//         } else if (!user) {
//             res.status(404).send({ error: 'User not found' })
//         } else {
//             const userDatas = { role: user.role };
//            role = userDatas.role
//         }
//     })

//     const userDataaaa = new issueDB({       //userMongoose is different collection         
//         Title: "Defect",
//         description: "some defect",
//         assigne: role,
//         issue: issue,
//         status: status
//     })
//     userDataaaa.save((err) => {
//         if (err) {
//             res.status(400).send({ error: err })
//         } else {
//             res.send({ message: 'data entered' })
//         }
//     })

// })


