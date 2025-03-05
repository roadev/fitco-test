const Task = require("../models/Task");
const Project = require("../models/Project");
const TeamMember = require("../models/TeamMember");

const authorizeTaskAccess = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const task = await Task.findByPk(id, { include: [{ model: Project }] });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (!task.Project) {
        return res
          .status(400)
          .json({ error: "Task is missing a valid project association" });
      }

      const project = task.Project;

      if (project.ownerId === userId) {
        return next(); // Project owner has full access
      }

      if (project.teamId) {
        const membership = await TeamMember.findOne({
          where: { teamId: project.teamId, userId },
        });

        if (!membership) {
          return res
            .status(403)
            .json({ error: "You are not a member of this team" });
        }

        if (requiredRoles.includes(membership.role)) {
          return next(); // The user has the required role to perform the action
        }

        return res.status(403).json({ error: "Insufficient permissions" });
      }

      return res
        .status(403)
        .json({ error: "Unauthorized to access this task" });
    } catch (error) {
      console.error("Task Authorization Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = authorizeTaskAccess;
