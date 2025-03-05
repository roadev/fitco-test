const Project = require("../models/Project");
const Task = require("../models/Task");

const createProject = async (req, res) => {
  try {
    const { name, description, teamId } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Project name must be at least 3 characters long" });
    }

    let team = null;
    if (teamId) {
      team = await Team.findByPk(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      const isMember = await TeamMember.findOne({
        where: { teamId, userId: req.user.id },
      });
      if (!isMember) {
        return res
          .status(403)
          .json({ error: "You are not a member of this team" });
      }
    }

    const newProject = await Project.create({
      name,
      description,
      ownerId: team ? null : req.user.id, // If no team is provided, the user owns it
      teamId: team ? team.id : null, // If a team is provided, assign it to the team
    });

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Error creating project" });
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

    const project = await Project.findOne({
      where: { id, userId: req.user.id },
    });

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized" });
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

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.ownerId !== req.user.id) {
      const isTeamAdmin = await TeamMember.findOne({
        where: { teamId: project.teamId, userId: req.user.id, role: "admin" },
      });
      if (!isTeamAdmin) {
        return res
          .status(403)
          .json({ error: "You are not authorized to update this project" });
      }
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
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.ownerId !== req.user.id) {
      const isTeamAdmin = await TeamMember.findOne({
        where: { teamId: project.teamId, userId: req.user.id, role: "admin" },
      });
      if (!isTeamAdmin) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this project" });
      }
    }

    await project.destroy();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Error deleting project" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
