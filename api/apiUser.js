
const mongoose = require('mongoose');
const express = require('express');
const userInfo = require('../schema/userSchema')


const router = express.Router();



//Create new user
router.post('/user', async (req, res) => {
    let incrUserId;
    let lastUser = await userInfo.findOne().sort({ _id: -1 });
    if (!lastUser) {
        incrUserId = 1;
    } else {
        incrUserId = lastUser.empid + 1;
    }

    const newUser = new userInfo({
        empid: incrUserId,
        userName: req.body.userName,
        gender: req.body.gender,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        role: req.body.role,
        isactive:req.body.isactive
    });
    newUser.save()
        .then(db =>
            res.send(db)
        )
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(400).send({ error: 'empid must be unique' });
            } else if (err.name === 'ValidationError') {
                const errors = {};
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.status(400).send({ errors });
            } else {
                console.log(err);
                res.status(500).send({ error: ' error' });
            }
        });
});

// Get all users
router.get('/user', (req, res) => {
    userInfo.find({})
        .then(users => {res.set('Access-Control-Allow-Origin', '*')
        res.send({ users })})
        .catch(err => {
            console.log("Error in getting all users", err);
            res.status(500).send({ error: 'Server error' });
        });
});

// Get user by empid
router.get('/user/:empid', (req, res) => {
    const { empid } = req.params;
    userInfo.findOne({ empid })
        .then(user => {
            if (!user) {
                res.status(404).send({ error: `User with empid ${empid} not found` });
            } else {
                res.send({ user });
            }
        })
        .catch(err => {
            console.log("Error in getting user", err);
            res.status(500).send({ error: 'Server error' });
        });
});

// Update user by empid
router.put('/user/:empid', (req, res) => {
    const { empid } = req.params;
    userInfo.findOneAndUpdate({ empid }, req.body, { new: true })
        .then(user => {
            if (!user) {
                res.status(404).send({ error: `User with empid ${empid} not found` });
            } else {
                res.send({ user });
            }
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(400).send({ error: 'empid must be unique' });
            } else if (err.name === 'ValidationError') {
                const errors = {};
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.status(400).send({ errors });
            } else {
                console.log("Error in updating user", err);
                res.status(500).send({ error: ' error' });
            }
        });
});

// Delete all users
router.delete('/user', (req, res) => {
    userInfo.deleteMany({})
        .then(() => res.send({ message: 'All users deleted' }))
        .catch(err => {
            console.log("Error in deleting all users", err);
            res.status(500).send({ error: 'Server error' });
        });
});

// Delete user by empid
router.delete('/user/:empid', (req, res) => {
    const { empid } = req.params;
    userInfo.findOneAndDelete({ empid })
        .then(user => {
            if (!user) {
                res.status(404).send({ error: `User with empid ${empid} not found` });
            } else {
                res.send({ message: `User with empid ${empid} deleted` });
            }
        })
        .catch(err => {
            console.log("Error in deleting a user", err);
            res.status(500).send({ error: 'Server error' });
        });
});

module.exports = router