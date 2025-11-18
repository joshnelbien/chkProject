const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Attendance = sequelize.define(
  "attendance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    sport: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    timeIn: {
      type: DataTypes.STRING,
    },
    timeOut: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
    },
    scheduleId: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "attendance",
    timestamps: true,
  }
);

module.exports = Attendance;
