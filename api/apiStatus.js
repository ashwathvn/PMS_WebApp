
const mongoose = require('mongoose');
const express = require('express');
const debugmodel = require('../schema/statusSchema')

const router = express.Router();
//Create a new bug status
router.post('/status', async (req, res) => {
    let incrStatusId;
    let lastStatusType = await debugmodel.findOne().sort({ _id: -1 });
    if (!lastStatusType) {
        incrStatusId = 1;
    } else {
        incrStatusId = lastStatusType.sid + 1;
    }

    const data = new debugmodel({
        sid: incrStatusId,
        status: req.body.status
    });

    await data.save()
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => {
            console.log("Error in saving data", err)
        });
})

//Get all bug statuses
router.get('/getallstatus', function (req, res) {
    debugmodel.find((err, val) => {
        if (err) {
            console.log("Error in getting all bug status", err);
        } else {
            res.json(val);
        }
    })
})

//Get single status details 
router.get('/getstatus/:id', function (req, res) {
    let fetchid = req.params.id;
    debugmodel.find(({ sid: fetchid }), (err, val) => {
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

//Update status 
router.put('/updatestatus/:id', async (req, res) => {
    let uid = req.params.sid;
    let ustatus = req.body.status;

    debugmodel.findOneAndUpdate({ id: uid },
        {
            $set: {
                status: ustatus,
            }
        },
        { new: true }, (err, data) => {
            if (err) {
                res.send(err);
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

//Deleting a bug status
router.delete('/deletestatus/:id', async (req, res) => {
    let deleteid = req.params.id;
    debugmodel.findOneAndDelete(({ qid: deleteid }), function (err, data) {
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
module.exports = router