const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const taskRoutes = require('./tasks');

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: 'v1'
  });
});

module.exports = router;
