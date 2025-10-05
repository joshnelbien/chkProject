const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize"); // ✅ FIX: use correct import

const TeamSchedule = sequelize.define(
  "TeamSchedule",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matchDate: {
      type: DataTypes.DATEONLY, // ✅ better for "2025-10-21"
      allowNull: false,
    },
    opponent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "teamSchedules",
    timestamps: false,
  }
);

module.exports = TeamSchedule;
