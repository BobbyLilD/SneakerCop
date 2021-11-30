const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class BuyRequest extends Sequelize.Model {}

BuyRequest.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        size: {
            type: Sequelize.STRING(3),
            allowNull: false
        },
        color: {
            type: Sequelize.STRING(15),
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'done'),
            allowNull: false,
            defaultValue: 'active'
        }
    },
    { sequelize: sequelize, underscored: true, modelname: "buyRequest"}
)

module.exports = BuyRequest;