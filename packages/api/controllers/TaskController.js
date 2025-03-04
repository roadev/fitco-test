const Task = require('../models/Task');

exports.createTask = async (req, res) => {
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

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks', details: error.message });
  }
};

exports.updateTask = async (req, res) => {
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

exports.deleteTask = async (req, res) => {
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
