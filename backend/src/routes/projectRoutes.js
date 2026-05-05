const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  addMember,
  deleteProject
} = require('../controllers/projectController');

// All project routes require authentication
router.use(authenticate);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.post('/:id/members', addMember);
router.delete('/:id', deleteProject);

module.exports = router;
