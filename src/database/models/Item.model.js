const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class Item extends Sequelize.Model {}

Item.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        brand: {
            type: Sequelize.STRING, // МЭЙБИ СДЕЛАТЬ ЕНУМ
            allowNull: false
        },
        publishDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    { sequelize: sequelize, underscored: true, modelname: "Item"}
);

module.exports = Item