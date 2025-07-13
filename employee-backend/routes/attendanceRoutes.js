const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');

// GET attendance records (optionally filter by user, month, year)
router.get('/', auth, async (req, res) => {
    const { userId, month, year } = req.query;
    let filter = {};
    if (userId) filter.userId = userId;
    if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        filter.date = { $gte: start, $lte: end };
    }
    const records = await Attendance.find(filter);
    res.json(records);
});

// POST check-in
router.post('/checkin', auth, async (req, res) => {
    const { date } = req.body;
    const attendance = new Attendance({
        userId: req.user.uid,
        date: date ? new Date(date) : new Date(),
        checkIn: new Date(),
    });
    await attendance.save();
    res.status(201).json(attendance);
});

// POST check-out
router.post('/checkout', auth, async (req, res) => {
    const { date } = req.body;
    const attendance = await Attendance.findOne({
        userId: req.user.uid,
        date: { $gte: new Date(new Date(date).setHours(0, 0, 0, 0)), $lte: new Date(new Date(date).setHours(23, 59, 59, 999)) }
    });
    if (!attendance) return res.status(404).json({ message: 'No check-in found for today' });
    attendance.checkOut = new Date();
    await attendance.save();
    res.json(attendance);
});

module.exports = router; 