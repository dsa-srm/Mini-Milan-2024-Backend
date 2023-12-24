

import { QueryInterface, DataTypes } from "sequelize";

const tableName = "bookings";

exports.default = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable(
      tableName,
      {
        id: {
          type: DataTypes.UUID,

          allowNull: false,
          primaryKey: true,
        },
        ticket_type: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        payment_id: {
          type: DataTypes.TEXT,
        },
        ticket_id: {
          type: DataTypes.TEXT,
        },
        payment_status: {
          type: DataTypes.ENUM("success", "failed", "pending"),
          defaultValue: "pending",
          allowNull: false,
        },
        ticket_status: {
          type: DataTypes.ENUM("success", "failed", "pending"),
          defaultValue: "pending",
          allowNull: false,
        },
        offline_ticket_issued: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,

          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        engine: "MYISAM",
        charset: "latin1", // default: null
      }
    );
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
