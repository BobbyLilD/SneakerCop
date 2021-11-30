const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class Wish extends Sequelize.Model {}

Token.init(
  {},
  { sequelize: sequelize, underscored: true, modelName: "wish" }
);

module.exports = Wish;
