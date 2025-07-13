const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true }, // Added password field
    photo: String,
    role: { type: String, default: 'employee' },
});
module.exports = mongoose.model('User', userSchema); 