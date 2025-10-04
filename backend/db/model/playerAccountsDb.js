const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const playerAccounts = sequelize.define("playerAccounts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  studentNumber: {
    type: DataTypes.STRING,

    unique: true,
  },
  email: {
    type: DataTypes.STRING,

    unique: true,
  },

  course: {
    type: DataTypes.STRING,
  },
  yearLevel: {
    type: DataTypes.STRING,
  },
  sport: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profilePicture: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
});

module.exports = playerAccounts;
