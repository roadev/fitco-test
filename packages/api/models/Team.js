const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Team = sequelize.define('Team', {
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
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
});

User.hasMany(Team, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
Team.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Team;
