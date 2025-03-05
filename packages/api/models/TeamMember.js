const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Team = require('./Team');

const TeamMember = sequelize.define('TeamMember', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'member', 'viewer'),
    allowNull: false,
    defaultValue: 'member',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
});

Team.hasMany(TeamMember, { foreignKey: 'teamId', onDelete: 'CASCADE' });
TeamMember.belongsTo(Team, { foreignKey: 'teamId' });

User.hasMany(TeamMember, { foreignKey: 'userId', onDelete: 'CASCADE' });
TeamMember.belongsTo(User, { foreignKey: 'userId' });

module.exports = TeamMember;
