const Task = require("../models/Task");
const Project = require("../models/Project");

const getTasksByProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await Project.findOne({
      where: { id, userId: req.user.id },
    });

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized" });
    }

    const tasks = await Task.findAll({
      where: { projectId: id, userId: req.user.id },
      include: [{ model: Project, attributes: ["id", "name"] }],
    });

    if (!tasks.length) {
      return res.status(404).json({ error: "No tasks found for this project" });
    }

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks for project:", error);
    res.status(500).json({ error: "Error fetching tasks for project" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, projectId, priority } = req.body;

    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Title must be at least 3 characters long" });
    }

    if (priority && !["low", "medium", "high", "urgent"].includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    let project = null;
    if (projectId) {
      project = await Project.findOne({
        where: { id: projectId, userId: req.user.id },
      });
      if (!project) {
        return res
          .status(404)
          .json({ error: "Project not found or unauthorized" });
      }
    }

    const newTask = await Task.create({
      title,
      description,
      priority: priority || "medium",
      userId: req.user.id,
      projectId: project ? project.id : null,
    });

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, projectId, priority } = req.body;

    if (isNaN(id) || parseInt(id) <= 0) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    if (title && (typeof title !== "string" || title.trim().length < 3)) {
      return res
        .status(400)
        .json({ error: "Title must be at least 3 characters long" });
    }

    if (status && !["pending", "in_progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    if (priority && !["low", "medium", "high", "urgent"].includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    if (projectId) {
      const project = await Project.findOne({
        where: { id: projectId, userId: req.user.id },
      });
      if (!project) {
        return res
          .status(404)
          .json({ error: "Project not found or unauthorized" });
      }
      task.projectId = projectId;
    }

    await task.update({
      title,
      description,
      status,
      projectId: task.projectId,
      priority,
    });

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      include: [{ model: Project, attributes: ["id", "name"] }],
      order: [
        ["priority", "DESC"],
        ["createdAt", "ASC"],
      ],
    });

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
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting task", details: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProject,
};
