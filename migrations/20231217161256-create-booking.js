"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tableName = "users";
exports.default = {
    up: (queryInterface) => {
        return queryInterface.createTable(tableName, {
            id: {
                type: sequelize_1.DataTypes.STRING, // Use STRING for varchar
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            reg_number: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            is_srm_student: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            phone_number: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            is_ticket_issued: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        }, {
            engine: "MYISAM",
            charset: "latin1", // default: null
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableName);
    },
};
