const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Task = require("./Task");
const User = require("./User");

const TaskAssignment = sequelize.define(
  "TaskAssignment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

Task.belongsToMany(User, {
  through: TaskAssignment,
  foreignKey: "taskId",
  onDelete: "CASCADE",
});
User.belongsToMany(Task, {
  through: TaskAssignment,
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = TaskAssignment;
