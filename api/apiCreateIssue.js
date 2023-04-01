
const mongoose = require('mongoose');
const express = require('express');
const issueDB = require('../schema/createIssueSchema')
const debugmodel = require('../schema/statusSchema')
const defectmodel = require('../schema/issueSchema')
const userInfo = require('../schema/userSchema')
const severitymodel = require('../schema/severitySchema')

const router = express.Router();
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)


//create issue

router.post('/createissue', async (req, res) => {
  const { sid } = req.body; // getting unique data from postman
  const { issueid } = req.body; // getting unique data from postman
  const { empid } = req.body; // getting unique data from postman
  const { severityid } = req.body; // getting unique data from postman


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

  const severitydata = await severitymodel.findOne({ severityid });
  if (!severitydata) {
    return res.status(404).send({ error: 'User not found in  empid' });
  }
  const { severity } = severitydata;

  let incrCreateIssueId;
  let lastIssue = await issueDB.findOne().sort({ _id: -1 });
  if (!lastIssue) {
    console.log("Not found")
    incrCreateIssueId = 1;
  } else {
    console.log("Found")
    if (lastIssue.createissueid) {
      incrCreateIssueId = lastIssue.createissueid + 1;
    } else {
      console.log("No createissueid for last issue")
      incrCreateIssueId = 1;
    }
  }

  const userDataaaa = new issueDB({
    createissueid: incrCreateIssueId,
    Title: req.body.Title,
    description: req.body.description,
    assigne: role,
    issue: issue,
    status: status,
    severity: severity,
    priority: req.body.priority,
    label: req.body.label
  });

  await userDataaaa.save((err) => {
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
    res.set('Access-Control-Allow-Origin', '*');
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
  const { description, sid, issueid, empid } = req.body;
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

      const severity = await severitymodel.findOne({ severityid });
      if (!severity) {
        return res.status(404).send({ error: 'User not found in  severityid' });
      }
      const { severitytype } = severity;

      // issueToUpdate.Title = req.params ;
      issueToUpdate.description = description;
      issueToUpdate.assigne = role;
      issueToUpdate.issue = issue;
      issueToUpdate.status = status;
      issueToUpdate.severity = severitytype;
      issueToUpdate.priority = req.body.priority;
      issueToUpdate.label = req.body.label;

      await issueToUpdate.save();
      res.send({ message: `Issue '${title}' updated` });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});


module.exports = router
