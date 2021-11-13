const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "None",
    },
    lastChecked: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  { sequelize: sequelize, underscored: true, modelName: "user" }
);
