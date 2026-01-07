const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const PerformanceHistory = sequelize.define("PerformanceHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  playerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "playerAccounts",
      key: "id",
    },
    onDelete: "CASCADE",
  },

  sport: {
    type: DataTypes.STRING,
  },

  // ================= GENERAL =================
  strength: { type: DataTypes.STRING, defaultValue: "70" },
  speed: { type: DataTypes.STRING, defaultValue: "70" },
  agility: { type: DataTypes.STRING, defaultValue: "70" },
  endurance: { type: DataTypes.STRING, defaultValue: "70" },
  accuracy: { type: DataTypes.STRING, defaultValue: "70" },
  tactics: { type: DataTypes.STRING, defaultValue: "70" },
  strategy: { type: DataTypes.STRING, defaultValue: "70" },
  physicalFitness: { type: DataTypes.STRING, defaultValue: "70" },
  teamCoordination: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= BASKETBALL =================
  basketballSpeed: { type: DataTypes.STRING, defaultValue: "70" },
  basketballVerticalJump: { type: DataTypes.STRING, defaultValue: "70" },
  basketballAgility: { type: DataTypes.STRING, defaultValue: "70" },
  basketballEndurance: { type: DataTypes.STRING, defaultValue: "70" },
  basketballShootingAccuracy: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= VOLLEYBALL =================
  volleyballVerticalJump: { type: DataTypes.STRING, defaultValue: "70" },
  volleyballReactionTime: { type: DataTypes.STRING, defaultValue: "70" },
  volleyballUpperBodyPower: { type: DataTypes.STRING, defaultValue: "70" },
  volleyballAgility: { type: DataTypes.STRING, defaultValue: "70" },
  volleyballServeAccuracy: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= CHEERDANCE =================
  cheerdanceFlexibility: { type: DataTypes.STRING, defaultValue: "70" },
  cheerdanceBalance: { type: DataTypes.STRING, defaultValue: "70" },
  cheerdanceMuscularEndurance: { type: DataTypes.STRING, defaultValue: "70" },
  cheerdanceCoordination: { type: DataTypes.STRING, defaultValue: "70" },
  cheerdanceExplosivePower: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= FUTSAL =================
  futsalSpeed: { type: DataTypes.STRING, defaultValue: "70" },
  futsalAgility: { type: DataTypes.STRING, defaultValue: "70" },
  futsalAerobicEndurance: { type: DataTypes.STRING, defaultValue: "70" },
  futsalBallControl: { type: DataTypes.STRING, defaultValue: "70" },
  futsalShootingAccuracy: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= SEPAK TAKRAW =================
  takrawLegPower: { type: DataTypes.STRING, defaultValue: "70" },
  takrawFlexibility: { type: DataTypes.STRING, defaultValue: "70" },
  takrawBalance: { type: DataTypes.STRING, defaultValue: "70" },
  takrawReactionTime: { type: DataTypes.STRING, defaultValue: "70" },
  takrawCoordination: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= TABLE TENNIS =================
  tableTennisReactionTime: { type: DataTypes.STRING, defaultValue: "70" },
  tableTennisHandEyeCoordination: {
    type: DataTypes.STRING,
    defaultValue: "70",
  },
  tableTennisSpeed: { type: DataTypes.STRING, defaultValue: "70" },
  tableTennisAccuracy: { type: DataTypes.STRING, defaultValue: "70" },
  tableTennisEndurance: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= BADMINTON =================
  badmintonAgility: { type: DataTypes.STRING, defaultValue: "70" },
  badmintonSpeed: { type: DataTypes.STRING, defaultValue: "70" },
  badmintonEndurance: { type: DataTypes.STRING, defaultValue: "70" },
  badmintonSmashPower: { type: DataTypes.STRING, defaultValue: "70" },
  badmintonAccuracy: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= TAEKWONDO =================
  taekwondoKickingSpeed: { type: DataTypes.STRING, defaultValue: "70" },
  taekwondoExplosivePower: { type: DataTypes.STRING, defaultValue: "70" },
  taekwondoFlexibility: { type: DataTypes.STRING, defaultValue: "70" },
  taekwondoReactionTime: { type: DataTypes.STRING, defaultValue: "70" },
  taekwondoBalance: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= ARNIS =================
  arnisHandSpeed: { type: DataTypes.STRING, defaultValue: "70" },
  arnisReactionTime: { type: DataTypes.STRING, defaultValue: "70" },
  arnisCoordination: { type: DataTypes.STRING, defaultValue: "70" },
  arnisEndurance: { type: DataTypes.STRING, defaultValue: "70" },
  arnisAccuracy: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= KARATE =================
  karateExplosivePower: { type: DataTypes.STRING, defaultValue: "70" },
  karateSpeed: { type: DataTypes.STRING, defaultValue: "70" },
  karateBalance: { type: DataTypes.STRING, defaultValue: "70" },
  karateReactionTime: { type: DataTypes.STRING, defaultValue: "70" },
  karateTechniquePrecision: { type: DataTypes.STRING, defaultValue: "70" },

  // ================= UPDATED INFO =================
  updatedBy: {
    type: DataTypes.STRING, // Coach/Admin username
  },

  notes: {
    type: DataTypes.TEXT, // optional coach notes
  },
});

module.exports = PerformanceHistory;
