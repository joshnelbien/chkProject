const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const Admin = sequelize.define(
  "Admin",
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
    experience: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    achievements: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
   isSuperAdminVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
    profilePicture: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  },
  {
    tableName: "adminAccounts",
    timestamps: true, 
  }
);

module.exports = Admin;
