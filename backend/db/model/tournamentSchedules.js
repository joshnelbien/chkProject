const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize"); // ← Make sure this points to your Sequelize instance

const Tournament = sequelize.define("tournaments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  teamSchedule: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "tournament",
  },
  tournamentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sport: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  startDate: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  teams: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  teamId: { type: DataTypes.STRING, allowNull: false },

  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // 👈 You can update this after the tournament ends
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
  homeScore: {
    type: DataTypes.STRING,
  },
  opponentScore: {
    type: DataTypes.STRING,
  },
});

module.exports = Tournament;
