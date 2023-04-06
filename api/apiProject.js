const mongoose = require('mongoose');
const express = require('express');
const projectModel = require('../schema/projectSchema');
var cors = require('cors');

const router = express.Router();

// Create a new project
router.post('/project', async (req, res) => {
  let incrProjId;
  let lastProject = await projectModel.findOne().sort({ _id: -1 });
  if (!lastProject) {
    incrProjId = 1;
  } else {
    incrProjId = lastProject.id + 1;
  }

  let newProject = new projectModel({
    id: incrProjId,
    name: req.body.name,
    primaryOwner: req.body.primaryOwner,
    secondaryOwner: req.body.secondaryOwner,
    isActive: req.body.isActive,
    description: req.body.description,
  });
  await newProject.save().then(response => {
    console.log(response)
    res.json(response)
  })
    .catch(err => {
      console.log("Error in saving data", err)
      res.status(500).send({ error: err.message });
    });
});

// Get all projects
router.get('/project', async (req, res) => {
  try {
    const projects = await projectModel.find({});
    // res.set('Access-Control-Allow-Origin', '*');
    res.send(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Get project by ID
router.get('/project/:id', async (req, res) => {
  try {
    const project = await projectModel.findOne({ id: req.params.id });
    if (!project) {
      res.status(404).send({ error: `Project with ID ${req.params.id} not found` });
    } else {
      res.send(project);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Update project by ID
router.put('/project/:id', async (req, res) => {
  try {
    const project = await projectModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!project) {
      res.status(404).send({ error: `Project with ID ${req.params.id} not found` });
    } else {
      res.send(project);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Delete project by ID
router.delete('/project/:id', async (req, res) => {
  try {
    const project = await projectModel.findOneAndDelete({ id: req.params.id });
    if (!project) {
      res.status(404).send({ error: `Project with ID ${req.params.id} not found` });
    } else {
      res.send(project);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
