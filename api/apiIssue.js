
const mongoose = require('mongoose');
const express = require('express');
const  defectmodel = require('../schema/issueSchema')

const router = express.Router();
//Create new issue type
router.post('/postissue', async (req, res) => {
    const data = new defectmodel({
        issueid: req.body.issueid,
        issue: req.body.issue,
    });

    const val = await data.save()
        .then(response => {
            console.log(response)
            res.json(val)
        })
        .catch(err => {
            console.log("Error in saving data", err)
        });
})

//Get all issue types
router.get('/allissues', function (req, res) {
    defectmodel.find((err, val) => {
        if (err) {
            console.log("Error in getting all issues", err)
        } else {
            res.json(val)
        }
    })
})

//Update an issue type
router.put('/updateissue/:id', async (req, res) => {
    let uissueid = req.params.id;
    let uissue = req.body.issue;

    defectmodel.findOneAndUpdate({ issueid: uissueid },
        {
            $set: {
                issue: uissue,
            }
        },
        { new: true }, (err, data) => {
            if (err) {
                res.send("Error in updating issue type")
            } else {
                if (data == null) {
                    res.send("Nothing found")
                }
                else {
                    res.send(data)
                }
            }
        })
})

//Delete an issue
router.delete('/deleteissue/:id', async (req, res) => {
    let deleteid = req.params.id;
    defectmodel.findOneAndDelete(({ issueid: deleteid }), function (err, data) {
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
})

module.exports=router