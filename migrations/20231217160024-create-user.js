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
                type: sequelize_1.DataTypes.STRING,
            },
            user_id: {
                type: sequelize_1.DataTypes.UUID,
            },
            payment_id: {
                type: sequelize_1.DataTypes.UUID,
            },
            ticket_id: {
                type: sequelize_1.DataTypes.UUID,
            },
            payment_status: {
                type: sequelize_1.DataTypes.STRING,
            },
            ticket_status: {
                type: sequelize_1.DataTypes.STRING,
            },
            offline_ticket_issued: {
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
