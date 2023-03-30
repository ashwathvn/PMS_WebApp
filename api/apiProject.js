const mongoose = require('mongoose');
const express = require('express');
const projectModel = require('../schema/projectSchema');

const router = express.Router();

// Create a new project
router.post('/project', async (req, res) => {
  try {
    const newProject = new projectModel(req.body);
    await newProject.save();
    res.send(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Get all projects
router.get('/project', async (req, res) => {
  try {
    const projects = await projectModel.find({});
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
