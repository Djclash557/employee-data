const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// GET tasks (optionally filter by user)
router.get('/', auth, async (req, res) => {
    const { userId, createdAfter, createdBefore, status } = req.query;
    const filter = {};
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    if (createdAfter || createdBefore) {
        filter.createdAt = {};
        if (createdAfter) filter.createdAt.$gte = new Date(createdAfter);
        if (createdBefore) filter.createdAt.$lt = new Date(createdBefore);
    }
    const tasks = await Task.find(filter);
    res.json(tasks);
});

// POST new task
router.post('/', auth, async (req, res) => {
    const task = new Task({ ...req.body, userId: req.body.userId || req.user.uid });
    await task.save();
    res.status(201).json(task);
});

// PUT update task
router.put('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// DELETE task
router.delete('/:id', auth, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router; 