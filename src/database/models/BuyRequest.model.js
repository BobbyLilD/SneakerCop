const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class BuyRequest extends Sequelize.Model {}

BuyRequest.init(
    {
        size: {
            type: Sequelize.STRING(3),
            allowNull: false
        },
        color: {
            type: Sequelize.STRING(15),
            allowNull: false
        }
    },
    { sequelize: sequelize, underscored: true, modelname: "buyRequest"}
)

module.exports = BuyRequest;