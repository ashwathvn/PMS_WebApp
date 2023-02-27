
const mongoose = require('mongoose');
const express = require('express');
const  {issueDB}= require('../schema/schema')
const  {debugmodel} = require('../schema/schema')
const  {defectmodel} = require('../schema/schema')
const {userInfo}  = require('../schema/schema')

const router = express.Router();
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)

router.post('/user', (req, res) => {
    const newUser = new userInfo(req.body);
    newUser.save()
        .then(db => res.send({ db }))
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
        .then(users => res.send({ users }))
        .catch(err => {
            console.log(err);
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
            console.log(err);
            res.status(500).send({ error: 'Server error' });
        });
});

// Update user by empid
router.put('/user/:empid', (req, res) => {
    const { empid } = req.params;
   const userdata= userInfo.findOneAndUpdate({ empid }, req.body, { new: true })
        .then(async user => {
            if (!user) {
                res.status(404).send({ error: `User with empid ${empid} not found` });
            } else {
                userdata.userName=req.body.userName
                userdata.gender=req.body.gender
                userdata.mobileNumber=req.body.mobileNumber
                userdata.email=req.body.email
                userdata.role=req.body.role
                await user.save();
                res.send({ message: `user info '${empid}' updated` });
                res.send({ user });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Server error' });
        });
});

// Delete all users
router.delete('/user', (req, res) => {
    userInfo.deleteMany({})
        .then(() => res.send({ message: 'All users deleted' }))
        .catch(err => {
            console.log(err);
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
            console.log(err);
            res.status(500).send({ error: 'Server error' });
        });
});

//create issue



router.post('/createissue', async (req, res) => {
    const { sid } = req.body; // getting unique data from postman
    const { issueid } = req.body; // getting unique data from postman
    const { empid } = req.body; // getting unique data from postman
  
  
      const debugUser = await debugmodel.findOne({ sid });
      if (!debugUser) {
        return res.status(404).send({ error: 'User not found in sid' });
      }
      const { status } = debugUser;
  
      const defectUser = await defectmodel.findOne({ issueid });
      if (!defectUser) {
        return res.status(404).send({ error: 'User not found issueid' });
      }
      const { issue } = defectUser;
  
      const userinfo = await userInfo.findOne({ empid });
      if (!userinfo) {
        return res.status(404).send({ error: 'User not found in  empid' });
      }
      const { role } = userinfo;
  
      const userDataaaa = new issueDB({
        Title: "Bug",
        description: "some defect",
        assigne: role,
        issue: issue,
        status: status
      });
  
      await  userDataaaa.save((err) => {
        if (err) {
          res.status(400).send({ error: err })
        } else {
          res.send({ message: 'data entered' })
        }
      })
  });
  
// GET request
router.get('/issues', async (req, res) => {
    try {
      const issues = await issueDB.find();
      res.send(issues);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });
  
  // GET request by title
  router.get('/issues/:title', async (req, res) => {
    const { title } = req.params;
    try {
      const issue = await issueDB.findOne({ Title: title });
      if (!issue) {
        res.status(404).send({ error: 'Issue not found' });
      } else {
        res.send(issue);
      }
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });
  
  // DELETE request
  router.delete('/issues', async (req, res) => {
    try {
      await issueDB.deleteMany();
      res.send({ message: 'All issues deleted' });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });
  
  // DELETE request by title
  router.delete('/issues/:title', async (req, res) => {
    const { title } = req.params;
    try {
      const issue = await issueDB.findOne({ Title: title });
      if (!issue) {
        res.status(404).send({ error: 'Issue not found' });
      } else {
        await issueDB.deleteOne({ Title: title });
        res.send({ message: `Issue '${title}' deleted` });
      }
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });
  
  // PUT request
  router.put('/issues/:title', async (req, res) => {
    const { title } = req.params;
    const { description,sid,issueid,empid} = req.body;
    try {
      const issueToUpdate = await issueDB.findOne({ Title: title });
      if (!issueToUpdate) {
        res.status(404).send({ error: 'Issue not found' });
      } else {
        const debugUser = await debugmodel.findOne({ sid });
        if (!debugUser) {
          return res.status(404).send({ error: 'User not found in sid' });
        }
        const { status } = debugUser;
    
        const defectUser = await defectmodel.findOne({ issueid });
        if (!defectUser) {
          return res.status(404).send({ error: 'User not found issueid' });
        }
        const { issue } = defectUser;
    
        const userinfo = await userInfo.findOne({ empid });
        if (!userinfo) {
          return res.status(404).send({ error: 'User not found in  empid' });
        }
        const { role } = userinfo;

        // issueToUpdate.Title = req.params ;
        issueToUpdate.description = description ;
        issueToUpdate.assigne = role ;
        issueToUpdate.issue = issue ;
        issueToUpdate.status = status;
        await issueToUpdate.save();
        res.send({ message: `Issue '${title}' updated` });
      }
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });
  

module.exports = router
