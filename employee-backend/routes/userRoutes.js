const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Employee = require('../models/Employee');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, department, status } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        // Also create an Employee document for the new user
        const existingEmployee = await Employee.findOne({ email });
        if (!existingEmployee) {
            const employee = new Employee({
                name,
                email,
                role: role || 'employee',
                department: department || '',
                status: status || 'Active',
            });
            await employee.save();
        }
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Error in /api/users/register:', err); // Added detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error('Error in /api/users/login:', err); // Added detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
});

// GET current user profile
router.get('/me', auth, async (req, res) => {
    console.log('Received /api/users/me request');
    console.log('req.user:', req.user);
    try {
        if (!req.user || !req.user.email) {
            console.error('No user or email in req.user');
            return res.status(400).json({ error: 'Invalid user info from token' });
        }
        let user = await User.findOne({ email: req.user.email });
        if (!user) {
            user = new User({
                name: req.user.name || req.user.email,
                email: req.user.email,
                photo: req.user.picture,
                role: 'employee',
            });
            await user.save();
            console.log('Created new user:', user);
        } else {
            console.log('Found existing user:', user);
        }
        res.json(user);
    } catch (err) {
        console.error('Error in /api/users/me:', err); // Already has detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 