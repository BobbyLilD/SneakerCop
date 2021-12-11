const { Sequelize } = require("sequelize");
const { sequelize } = require("..");
const Image = require("./Image.model");
const StoreOffer = require("./StoreOffer.model");

class Item extends Sequelize.Model {}

Item.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        }, 
        brand: {
            type: Sequelize.STRING(20), // МЭЙБИ СДЕЛАТЬ ЕНУМ
            allowNull: false
        },
        styleCode: {
            type: Sequelize.STRING(15),
            allowNull: false
        },
        publishDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    { sequelize: sequelize, underscored: true, modelname: "item"}
);


Item.hasMany(Image, {
    foreignKey: "itemId",
    onDelete: "cascade"
})
Image.belongsTo(Item);

Item.hasMany(StoreOffer, {
    foreignKey: "itemId",
    onDelete: "cascade"
})
StoreOffer.belongsTo(Item);

module.exports = Item