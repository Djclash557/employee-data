// ... existing code ...
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tasks', taskRoutes);

// Root route for Render and health check
app.get('/', (req, res) => {
  res.send('Employee Management System API is running.');
});
// ... existing code ...
