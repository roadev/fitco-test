const express = require('express');
const { createProject, getProjects,
    getProjectById, updateProject, deleteProject } = require('../controllers/ProjectController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createProject);
router.get('/', verifyToken, getProjects);
router.get('/:id', verifyToken, getProjectById);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

module.exports = router;
