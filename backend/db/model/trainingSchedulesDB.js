const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const TrainingSchedule = sequelize.define("TrainingSchedule", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
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
    type: DataTypes.TEXT, // we use TEXT to allow longer comma-separated lists
    allowNull: false,
  },
  teamId: { type: DataTypes.STRING },
});

module.exports = TrainingSchedule;
