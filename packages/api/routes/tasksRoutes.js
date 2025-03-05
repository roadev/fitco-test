const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask, assignTask } = require('../controllers/TaskController');
const { verifyToken } = require('../middleware/auth');
const authorizeTaskAccess = require('../middleware/taskAuthorization');

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, authorizeTaskAccess(['admin', 'member', 'viewer']), getTaskById);
router.put('/:id', verifyToken, authorizeTaskAccess(['admin', 'member']), updateTask);
router.delete('/:id', verifyToken, authorizeTaskAccess(['admin']), deleteTask);
router.put('/:id/assign', verifyToken, authorizeTaskAccess(['admin']), assignTask);

module.exports = router;
