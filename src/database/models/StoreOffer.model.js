const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class StoreOffer extends Sequelize.Model {}

StoreOffer.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        store:{
            type: Sequelize.ENUM('Nike SNKRS', 'Nike', 'Brandshop' , 'KM20', 'Adidas'),
            allowNull: false
        },
        link: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        availableSizes: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: false
        }
    },
    {sequelize: sequelize, underscored: true, modelname: "storeOffer"}
);

module.exports = StoreOffer;