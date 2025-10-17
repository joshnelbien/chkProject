const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const playerAccounts = sequelize.define("playerAccounts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  // 🔹 Basic Info
  teamId: {
    type: DataTypes.STRING,
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

  bDay: {
    type: DataTypes.STRING,
  },

  jerseyNo: {
    type: DataTypes.STRING,
  },

  position: {
    type: DataTypes.STRING,
  },

  // 🩺 Basic Health Info
  height: {
    type: DataTypes.STRING,
  },
  weight: {
    type: DataTypes.STRING,
  },
  bmi: {
    type: DataTypes.STRING,
  },
  bloodType: {
    type: DataTypes.STRING,
  },
  restingHeartRate: {
    type: DataTypes.STRING,
  },
  bloodPressure: {
    type: DataTypes.STRING,
  },
  allergies: {
    type: DataTypes.TEXT,
  },

  // 📜 Medical History
  chronicIllness: {
    type: DataTypes.STRING,
  },
  hospitalization: {
    type: DataTypes.TEXT,
  },
  surgery: {
    type: DataTypes.TEXT,
  },
  familyHistory: {
    type: DataTypes.TEXT,
  },
  vaccineRecord: {
    type: DataTypes.STRING,
  },

  // 💊 Current Health Status
  medications: {
    type: DataTypes.TEXT,
  },
  injuries: {
    type: DataTypes.TEXT,
  },
  illnesses: {
    type: DataTypes.TEXT,
  },
  sleepHours: {
    type: DataTypes.STRING,
  },
  dietPlan: {
    type: DataTypes.TEXT,
  },
  fitnessLevel: {
    type: DataTypes.STRING,
  },
  lastCheckup: {
    type: DataTypes.DATE,
  },
  clearedForActivity: {
    type: DataTypes.STRING,
  },
  doctorInfo: {
    type: DataTypes.TEXT,
  },

  // ⚽ Sports Related Health Data
  sportsInjuries: {
    type: DataTypes.TEXT,
  },
  therapyRecords: {
    type: DataTypes.TEXT,
  },

  // 🚨 Emergency Info
  emergencyName: {
    type: DataTypes.STRING,
  },
  emergencyRelation: {
    type: DataTypes.STRING,
  },
  emergencyAddress: {
    type: DataTypes.TEXT,
  },
  emergencyContact: {
    type: DataTypes.STRING,
  },
  preferredHospital: {
    type: DataTypes.STRING,
  },

  // 🔐 Account Info
  password: {
    type: DataTypes.STRING,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },

  // 🖼️ Profile Picture
  profilePicture: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
});

module.exports = playerAccounts;
