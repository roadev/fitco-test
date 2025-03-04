const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return res.status(400).json({ error: 'Project name must be at least 3 characters long' });
    }

    const newProject = await Project.create({ name, description, userId: req.user.id });

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: 'Error creating project' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { userId: req.user.id } });

    if (!projects.length) {
      return res.status(404).json({ error: "No projects found" });
    }

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Error fetching projects" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await Project.findOne({ where: { id, userId: req.user.id } });

    if (!project) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ error: "Error fetching project" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (isNaN(id) || parseInt(id) <= 0) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await Project.findOne({ where: { id, userId: req.user.id } });

    if (!project) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    if (name && (typeof name !== 'string' || name.trim().length < 3)) {
      return res.status(400).json({ error: "Project name must be at least 3 characters long" });
    }

    await project.update({ name, description });

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Error updating project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({ where: { id, userId: req.user.id } });

    if (!project) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    await project.destroy();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Error deleting project" });
  }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };
