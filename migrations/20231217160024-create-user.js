"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tableName = "users";
exports.default = {
    up: (queryInterface) => {
        return queryInterface.createTable(tableName, {
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            reg_number: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            is_ktr_student: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            phone_number: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
            },
            is_ticket_issued: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            gender: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            is_deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
