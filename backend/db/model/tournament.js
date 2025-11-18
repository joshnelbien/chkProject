// 📁 backend/db/model/tournamentSchedule.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const Tournament = require("./tournamentSchedules");

const TournamentSchedule = sequelize.define("tournament_schedules", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  teamSchedule: {
    type: DataTypes.STRING,
  },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  startTime: { type: DataTypes.STRING, allowNull: false },
  endTime: { type: DataTypes.STRING, allowNull: false },
  opponent: { type: DataTypes.STRING, allowNull: false },
  teamId: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
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

Tournament.hasMany(TournamentSchedule, {
  foreignKey: "tournamentId",
  as: "schedules", // 👈 important alias
  onDelete: "CASCADE",
});

TournamentSchedule.belongsTo(Tournament, {
  foreignKey: "tournamentId",
  as: "tournament", // optional
});

module.exports = TournamentSchedule;
