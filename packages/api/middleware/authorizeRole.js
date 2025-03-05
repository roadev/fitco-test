const TeamMember = require("../models/TeamMember");

const authorizeRole = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const { teamId } = req.params;
      const userId = req.user.id;

      if (!teamId) {
        return res
          .status(400)
          .json({ error: "Team ID is required for role verification" });
      }

      const membership = await TeamMember.findOne({
        where: { teamId, userId },
      });

      if (!membership) {
        return res
          .status(403)
          .json({ error: "Access denied. You are not a member of this team." });
      }

      if (!requiredRoles.includes(membership.role)) {
        return res
          .status(403)
          .json({ error: "Insufficient permissions for this action" });
      }

      next();
    } catch (error) {
      console.error("Error in role authorization:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = authorizeRole;
