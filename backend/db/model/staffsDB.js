const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Staffs = sequelize.define("Staffs", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
    },

    image: {
        type: DataTypes.BLOB("long"), 
        allowNull: true,
    },
}, {
    tableName: "staffs",
    timestamps: true,
});

module.exports = Staffs;
