const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Team = require("./Team");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Team,
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Project, { foreignKey: "ownerId", onDelete: "SET NULL" });
Project.belongsTo(User, { foreignKey: "ownerId" });

Team.hasMany(Project, { foreignKey: "teamId", onDelete: "SET NULL" });
Project.belongsTo(Team, { foreignKey: "teamId" });

module.exports = Project;
