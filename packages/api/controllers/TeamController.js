const Team = require("../models/Team");
const TeamMember = require("../models/TeamMember");

const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Team name must be at least 3 characters long" });
    }

    const newTeam = await Team.create({
      name,
      description,
      ownerId: req.user.id,
    });

    await TeamMember.create({
      teamId: newTeam.id,
      userId: req.user.id,
      role: "admin",
    });

    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Error creating team" });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [{ model: TeamMember, where: { userId: req.user.id } }],
    });

    if (!teams.length) {
      return res.status(404).json({ error: "No teams found" });
    }

    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Error fetching teams" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findOne({
      where: { id },
      include: [
        {
          model: TeamMember,
          include: [
            {
              model: require("../models/User"),
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found or unauthorized" });
    }

    res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ error: "Error fetching team" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({ where: { id, ownerId: req.user.id } });

    if (!team) {
      return res.status(404).json({ error: "Team not found or unauthorized" });
    }

    await team.destroy();
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Error deleting team" });
  }
};

module.exports = { createTeam, getTeams, getTeamById, deleteTeam };
