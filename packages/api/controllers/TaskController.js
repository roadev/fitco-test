const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ error: 'Title must be at least 3 characters long' });
    }

    const newTask = await Task.create({ 
      title, 
      description, 
      userId: req.user.id 
    });

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Error creating task', details: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (title && (typeof title !== 'string' || title.trim().length < 3)) {
      return res.status(400).json({ error: 'Title must be at least 3 characters long' });
    }

    if (status && !['pending', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    await task.update({ title, description, status });

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Error updating task', details: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });

    if (!tasks.length) {
      return res.status(404).json({ error: "No tasks found" });
    }

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Error fetching task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task', details: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
