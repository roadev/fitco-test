const TeamMember = require("../models/TeamMember");
const Team = require("../models/Team");
const User = require("../models/User");

const addMember = async (req, res) => {
  try {
    const { teamId, userId, role } = req.body;

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

    const newMember = await TeamMember.create({
      teamId,
      userId,
      role: role || "member",
    });

    res.status(201).json({ message: "User added to team", member: newMember });
  } catch (error) {
    console.error("Error adding team member:", error);
    res.status(500).json({ error: "Error adding team member" });
  }
};

const removeMember = async (req, res) => {
  try {
    const { teamId, userId } = req.params;

    const team = await Team.findOne({
      where: { id: teamId, ownerId: req.user.id },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found or unauthorized" });
    }

    await TeamMember.destroy({ where: { teamId, userId } });

    res.json({ message: "User removed from team" });
  } catch (error) {
    console.error("Error removing team member:", error);
    res.status(500).json({ error: "Error removing team member" });
  }
};

module.exports = { addMember, removeMember };
