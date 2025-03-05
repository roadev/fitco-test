const TeamMember = require("../models/TeamMember");
const Team = require("../models/Team");
const User = require("../models/User");

const addMember = async (req, res) => {
  try {
    const { teamId, userId, role } = req.body;

    if (!teamId || isNaN(teamId) || parseInt(teamId) <= 0) {
      return res.status(400).json({ error: "Invalid team ID" });
    }

    if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (role && !["admin", "member", "viewer"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Invalid role. Allowed values: admin, member, viewer" });
    }

    const team = await Team.findOne({
      where: { id: teamId, ownerId: req.user.id },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found or unauthorized" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingMember = await TeamMember.findOne({
      where: { teamId, userId },
    });
    if (existingMember) {
      return res
        .status(400)
        .json({ error: "User is already a member of this team" });
    }

    const newMember = await TeamMember.create({
      teamId,
      userId,
      role: role || "member",
    });

    res.status(201).json({ message: "User added to team", member: newMember });
  } catch (error) {
    console.error("Error adding team member:", error);
    res
      .status(500)
      .json({ error: "Error adding team member", details: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const { teamId, userId } = req.params;

    if (!teamId || isNaN(teamId) || parseInt(teamId) <= 0) {
      return res.status(400).json({ error: "Invalid team ID" });
    }

    if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const team = await Team.findOne({
      where: { id: teamId, ownerId: req.user.id },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found or unauthorized" });
    }

    const member = await TeamMember.findOne({ where: { teamId, userId } });
    if (!member) {
      return res
        .status(404)
        .json({ error: "User is not a member of this team" });
    }

    await member.destroy();
    res.json({ message: "User removed from team" });
  } catch (error) {
    console.error("Error removing team member:", error);
    res
      .status(500)
      .json({ error: "Error removing team member", details: error.message });
  }
};

module.exports = { addMember, removeMember };
