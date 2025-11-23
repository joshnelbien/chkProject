const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const MedalTally = sequelize.define("MedalTally", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

      year: {
        type: DataTypes.STRING,
    },

    sports: {
        type: DataTypes.TEXT,
    },
    gold: {
        type: DataTypes.STRING,
    },
    silver: {
        type: DataTypes.STRING,
    },
    bronze:{
        type: DataTypes.STRING,
    }
});

module.exports = MedalTally;
