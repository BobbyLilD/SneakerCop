const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class StoreToItem extends Sequelize.Model {}

StoreToItem.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        store:{
            type: Sequelize.ENUM(),//СДЕЛАТЬ ПЕРЕЧИСЛЕНИЕ
            allowNull: false
        },
        link: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNul: false
        },
        availableSizes: {
            //СДЕЛАТЬ МАССИВ ФЛОУТОВ
        }
    },
    {sequelize: sequelize, underscored: true, modelname: "storeToItem"}
);

module.exports = StoreToItem;