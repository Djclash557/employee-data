const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    userId: String, // Store Firebase UID as string
    date: Date,
    checkIn: Date,
    checkOut: Date,
});
module.exports = mongoose.model('Attendance', attendanceSchema); 