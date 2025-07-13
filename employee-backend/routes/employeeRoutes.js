const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

// GET all employees
router.get('/', auth, async (req, res) => {
    const { createdAfter, createdBefore, role } = req.query;
    const filter = {};
    if (createdAfter || createdBefore) {
        filter.createdAt = {};
        if (createdAfter) filter.createdAt.$gte = new Date(createdAfter);
        if (createdBefore) filter.createdAt.$lt = new Date(createdBefore);
    }
    if (role) filter.role = role;
    const employees = await Employee.find(filter);
    res.json(employees);
});

// POST new employee
router.post('/', auth, async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
});

// PUT update employee
router.put('/:id', auth, async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
});

// DELETE employee
router.delete('/:id', auth, async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router; 