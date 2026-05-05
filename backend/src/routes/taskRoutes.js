const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  createTask,
  getProjectTasks,
  getUserTasks,
  updateTask,
  deleteTask,
  getDashboardStats
} = require('../controllers/taskController');

// All task routes require authentication
router.use(authenticate);

router.post('/', createTask);
router.get('/user/tasks', getUserTasks);
router.get('/project/:projectId', getProjectTasks);
router.get('/dashboard/stats', getDashboardStats);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
