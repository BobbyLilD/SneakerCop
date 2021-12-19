const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class ShippingAddress extends Sequelize.Model {}

ShippingAddress.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        country: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        city: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        street: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        building: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        apartment: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        isSelected: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        } 
    },
    {sequelize: sequelize, underscored: true, modelname: "shippingAddress"}
)

module.exports = ShippingAddress;