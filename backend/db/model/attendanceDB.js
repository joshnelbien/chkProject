const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const attendance = sequelize.define(
  "attendance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sports: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeOut: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
     date: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
      description: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    tableName: "attendance",
    timestamps: true,
  }
);

module.exports = attendance;
