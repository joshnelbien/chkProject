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
  date: { type: DataTypes.DATEONLY, allowNull: false },
  startTime: { type: DataTypes.STRING, allowNull: false },
  endTime: { type: DataTypes.STRING, allowNull: false },
  opponent: { type: DataTypes.STRING, allowNull: false },
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
