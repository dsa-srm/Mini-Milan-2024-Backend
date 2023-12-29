"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tableName = "bookings";
exports.default = {
    up: (queryInterface) => {
        return queryInterface.createTable(tableName, {
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            ticket_type: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            payment_id: {
                type: sequelize_1.DataTypes.TEXT,
            },
            ticket_id: {
                type: sequelize_1.DataTypes.TEXT,
            },
            payment_status: {
                type: sequelize_1.DataTypes.ENUM("success", "failed", "pending"),
                defaultValue: "pending",
                allowNull: false,
            },
            ticket_status: {
                type: sequelize_1.DataTypes.ENUM("success", "failed", "pending"),
                defaultValue: "pending",
                allowNull: false,
            },
            offline_ticket_issued: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
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
