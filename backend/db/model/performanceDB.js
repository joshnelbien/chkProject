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

  strength: DataTypes.INTEGER,
  speed: DataTypes.INTEGER,
  agility: DataTypes.INTEGER,
  endurance: DataTypes.INTEGER,
  accuracy: DataTypes.INTEGER,
  tactics: DataTypes.INTEGER,
  strategy: DataTypes.INTEGER,
  physicalFitness: DataTypes.INTEGER,
  teamCoordination: DataTypes.INTEGER,

  updatedBy: {
    type: DataTypes.STRING, // Coach/Admin username
  },

  notes: {
    type: DataTypes.TEXT, // optional coach notes
  }
});

module.exports = PerformanceHistory;
