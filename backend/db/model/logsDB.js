const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Logs = sequelize.define("Logs", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

      email: {
        type: DataTypes.STRING,
    },


    description: {
        type: DataTypes.TEXT,
    },
    time: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
    }
});

module.exports = Logs;
