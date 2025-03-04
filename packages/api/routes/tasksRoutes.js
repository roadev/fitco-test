const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/TaskController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTaskById);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
