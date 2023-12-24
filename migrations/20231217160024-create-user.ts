import { QueryInterface, DataTypes } from "sequelize";

const tableName = "users";

exports.default = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable(
      tableName,
      {
        id: {
          type: DataTypes.UUID,
					primaryKey: true,
					allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
          
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        reg_number: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        is_ktr_student: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        phone_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        is_ticket_issued: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,

        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        gender: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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






