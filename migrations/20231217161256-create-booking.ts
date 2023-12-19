import { QueryInterface, DataTypes } from "sequelize";

const tableName = "users";

exports.default = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable(
      tableName,
      {
        id: {
          type: DataTypes.STRING, // Use STRING for varchar
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        reg_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_srm_student: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        phone_number: {
          type: DataTypes.INTEGER,
        },
        is_ticket_issued: {
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
