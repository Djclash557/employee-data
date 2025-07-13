const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tasks', taskRoutes);

// Root route for Render and health check
app.get('/', (req, res) => {
    res.send('Employee Management System API is running.');
});

<<<<<<< HEAD
module.exports = app; 
=======
module.exports = app; 
>>>>>>> 3f9e046d97113d5edf7525fd44a0508ae59b6aa6
