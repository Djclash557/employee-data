const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    status: String,
    dueDate: Date,
}, { timestamps: true });
module.exports = mongoose.model('Task', taskSchema); 