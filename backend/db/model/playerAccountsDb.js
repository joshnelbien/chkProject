const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const playerAccounts = sequelize.define("playerAccounts", {
  // 1. PRIMARY KEY
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  // 2. PERSONAL IDENTIFICATION (Fields from React Form)
  firstName: {
    // Mapped from formData.firstName
    type: DataTypes.STRING,
  },
  lastName: {
    // Mapped from formData.lastName
    type: DataTypes.STRING,
  },
  studentNumber: {
    // Mapped from formData.studentNumber
    type: DataTypes.STRING,

    unique: true,
  },
  email: {
    // Mapped from formData.email
    type: DataTypes.STRING,

    unique: true,
  },

  // 3. ACADEMIC/ATHLETIC DETAILS (Fields from React Form)
  course: {
    // Mapped from formData.course
    type: DataTypes.STRING,
  },
  yearLevel: {
    // Mapped from formData.yearLevel (Your "Sport Grade Level")
    type: DataTypes.STRING, // Storing as a string (e.g., '1st Year')
  },
  sport: {
    // Mapped from formData.sport
    type: DataTypes.STRING,
  },

  // 4. SECURITY & STATUS FIELDS
  password: {
    // Mapped from formData.password (will store the hashed password)
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
