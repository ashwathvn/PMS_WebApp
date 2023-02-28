const mongoose = require('mongoose');
const express = require('express');
const severitymodel = require('../schema/severitySchema')

const router = express.Router();

//Create new severity type
router.post('/postseverity', async (req, res) => {
    const data = new severitymodel({
        severityid: req.body.severityid,
        severity: req.body.severity,
    });

    const val = await data.save()
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => {
            console.log("Error in saving data", err)
        });
})

//Get all severity types
router.get('/allseverities', function (req, res) {
    severitymodel.find((err, val) => {
        if (err) {
            console.log("Error in getting all severities", err)
        } else {
            res.json(val)
        }
    })
})

//Update an severity type
router.put('/updateseverity/:id', async (req, res) => {
    let useverityid = req.params.id;
    let useverity = req.body.severity;

    severitymodel.findOneAndUpdate({ severityid: useverityid },
        {
            $set: {
                severity: useverity,
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

//Delete a severity
router.delete('/deleteseverity/:id', async (req, res) => {
    let deleteid = req.params.id;
    severitymodel.findOneAndDelete(({ severityid: deleteid }), function (err, data) {
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

module.exports = router