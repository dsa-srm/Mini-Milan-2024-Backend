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
          type: DataTypes.STRING,
        },
        user_id: {
          type: DataTypes.UUID,
        },
        payment_id: {
          type: DataTypes.UUID,
        },
        ticket_id: {
          type: DataTypes.UUID,
        },
        payment_status: {
          type: DataTypes.STRING,
        },
        ticket_status: {
          type: DataTypes.STRING,
        },
        offline_ticket_issued: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
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
