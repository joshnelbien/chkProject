const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const PerformanceHistory = require("./performanceDB");

const playerAccounts = sequelize.define("playerAccounts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  /* ================= BASIC INFO ================= */
  teamId: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,

  studentNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  course: DataTypes.STRING,
  yearLevel: DataTypes.STRING,
  sport: DataTypes.STRING,
  bDay: DataTypes.STRING,
  jerseyNo: DataTypes.STRING,
  position: DataTypes.STRING,

  /* ================= HEALTH INFO ================= */
  height: DataTypes.STRING,
  weight: DataTypes.STRING,
  bmi: DataTypes.STRING,
  bloodType: DataTypes.STRING,
  restingHeartRate: DataTypes.STRING,
  bloodPressure: DataTypes.STRING,
  allergies: DataTypes.TEXT,

  chronicIllness: DataTypes.STRING,
  hospitalization: DataTypes.TEXT,
  surgery: DataTypes.TEXT,
  familyHistory: DataTypes.TEXT,
  vaccineRecord: DataTypes.STRING,

  medications: DataTypes.TEXT,
  injuries: DataTypes.TEXT,
  illnesses: DataTypes.TEXT,
  sleepHours: DataTypes.STRING,
  dietPlan: DataTypes.TEXT,
  fitnessLevel: DataTypes.STRING,
  lastCheckup: DataTypes.STRING,
  clearedForActivity: DataTypes.STRING,
  doctorInfo: DataTypes.TEXT,

  sportsInjuries: DataTypes.TEXT,
  therapyRecords: DataTypes.TEXT,

  /* ================= EMERGENCY ================= */
  emergencyName: DataTypes.STRING,
  emergencyRelation: DataTypes.STRING,
  emergencyAddress: DataTypes.TEXT,
  emergencyContact: DataTypes.STRING,
  preferredHospital: DataTypes.STRING,

  /* ================= ACCOUNT ================= */
  password: DataTypes.STRING,
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },

  rejectedReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  /* ================= GENERAL PERFORMANCE ================= */
  strength: { type: DataTypes.STRING, defaultValue: 70 },
  speed: { type: DataTypes.STRING, defaultValue: 70 },
  agility: { type: DataTypes.STRING, defaultValue: 70 },
  endurance: { type: DataTypes.STRING, defaultValue: 70 },
  accuracy: { type: DataTypes.STRING, defaultValue: 70 },
  tactics: { type: DataTypes.STRING, defaultValue: 70 },
  strategy: { type: DataTypes.STRING, defaultValue: 70 },
  physicalFitness: { type: DataTypes.STRING, defaultValue: 70 },
  teamCoordination: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= BASKETBALL ================= */
  basketballSpeed: { type: DataTypes.STRING, defaultValue: 70 },
  basketballVerticalJump: { type: DataTypes.STRING, defaultValue: 70 },
  basketballAgility: { type: DataTypes.STRING, defaultValue: 70 },
  basketballEndurance: { type: DataTypes.STRING, defaultValue: 70 },
  basketballShootingAccuracy: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= VOLLEYBALL ================= */
  volleyballVerticalJump: { type: DataTypes.STRING, defaultValue: 70 },
  volleyballReactionTime: { type: DataTypes.STRING, defaultValue: 70 },
  volleyballUpperBodyPower: { type: DataTypes.STRING, defaultValue: 70 },
  volleyballAgility: { type: DataTypes.STRING, defaultValue: 70 },
  volleyballServeAccuracy: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= CHEERDANCE ================= */
  cheerdanceFlexibility: { type: DataTypes.STRING, defaultValue: 70 },
  cheerdanceBalance: { type: DataTypes.STRING, defaultValue: 70 },
  cheerdanceMuscularEndurance: { type: DataTypes.STRING, defaultValue: 70 },
  cheerdanceCoordination: { type: DataTypes.STRING, defaultValue: 70 },
  cheerdanceExplosivePower: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= FUTSAL ================= */
  futsalSpeed: { type: DataTypes.STRING, defaultValue: 70 },
  futsalAgility: { type: DataTypes.STRING, defaultValue: 70 },
  futsalAerobicEndurance: { type: DataTypes.STRING, defaultValue: 70 },
  futsalBallControl: { type: DataTypes.STRING, defaultValue: 70 },
  futsalShootingAccuracy: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= SEPAK TAKRAW ================= */
  takrawLegPower: { type: DataTypes.STRING, defaultValue: 70 },
  takrawFlexibility: { type: DataTypes.STRING, defaultValue: 70 },
  takrawBalance: { type: DataTypes.STRING, defaultValue: 70 },
  takrawReactionTime: { type: DataTypes.STRING, defaultValue: 70 },
  takrawCoordination: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= TABLE TENNIS ================= */
  tableTennisReactionTime: { type: DataTypes.STRING, defaultValue: 70 },
  tableTennisHandEyeCoordination: { type: DataTypes.STRING, defaultValue: 70 },
  tableTennisSpeed: { type: DataTypes.STRING, defaultValue: 70 },
  tableTennisAccuracy: { type: DataTypes.STRING, defaultValue: 70 },
  tableTennisEndurance: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= BADMINTON ================= */
  badmintonAgility: { type: DataTypes.STRING, defaultValue: 70 },
  badmintonSpeed: { type: DataTypes.STRING, defaultValue: 70 },
  badmintonEndurance: { type: DataTypes.STRING, defaultValue: 70 },
  badmintonSmashPower: { type: DataTypes.STRING, defaultValue: 70 },
  badmintonAccuracy: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= TAEKWONDO ================= */
  taekwondoKickingSpeed: { type: DataTypes.STRING, defaultValue: 70 },
  taekwondoExplosivePower: { type: DataTypes.STRING, defaultValue: 70 },
  taekwondoFlexibility: { type: DataTypes.STRING, defaultValue: 70 },
  taekwondoReactionTime: { type: DataTypes.STRING, defaultValue: 70 },
  taekwondoBalance: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= ARNIS ================= */
  arnisHandSpeed: { type: DataTypes.STRING, defaultValue: 70 },
  arnisReactionTime: { type: DataTypes.STRING, defaultValue: 70 },
  arnisCoordination: { type: DataTypes.STRING, defaultValue: 70 },
  arnisEndurance: { type: DataTypes.STRING, defaultValue: 70 },
  arnisAccuracy: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= KARATE ================= */
  karateExplosivePower: { type: DataTypes.STRING, defaultValue: 70 },
  karateSpeed: { type: DataTypes.STRING, defaultValue: 70 },
  karateBalance: { type: DataTypes.STRING, defaultValue: 70 },
  karateReactionTime: { type: DataTypes.STRING, defaultValue: 70 },
  karateTechniquePrecision: { type: DataTypes.STRING, defaultValue: 70 },

  /* ================= FILES ================= */
  profilePicture: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },

  medicalCertificate: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },

  achievements: DataTypes.STRING,

  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

/* ================= ASSOCIATIONS ================= */
playerAccounts.hasMany(PerformanceHistory, { foreignKey: "playerId" });
PerformanceHistory.belongsTo(playerAccounts, { foreignKey: "playerId" });

module.exports = playerAccounts;
