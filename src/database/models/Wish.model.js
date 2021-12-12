const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class Wish extends Sequelize.Model {}

Wish.init(
  {},
  { sequelize: sequelize, underscored: true, modelName: "wish" }
);

module.exports = Wish;
