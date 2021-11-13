const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class Image extends Sequelize.Model {}

Image.init(
    {
        location: {
            type: Sequelize.STRING,
            primaryKey: true,
        }
    }
)

module.exports = Image;