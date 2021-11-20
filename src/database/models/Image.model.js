const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class Image extends Sequelize.Model {}

Image.init(
    {
        location: {
            type: Sequelize.STRING(255),
            primaryKey: true,
        }
    },
    { sequelize: sequelize, underscored: true, modelName: "image" }
)

module.exports = Image;