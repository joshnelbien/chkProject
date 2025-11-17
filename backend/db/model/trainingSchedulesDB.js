// models/TrainingSchedule.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const TrainingSchedule = sequelize.define("TrainingSchedule", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  workoutDetails: {
    type: DataTypes.STRING,
  },

  teamSchedule: {
    type: DataTypes.STRING,
  },

  type: {
    type: DataTypes.STRING,
    defaultValue: "training",
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  coach: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  focusAreas: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
});

module.exports = TrainingSchedule;
