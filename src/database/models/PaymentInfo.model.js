const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class PaymentInfo extends Sequelize.Model {}

PaymentInfo.init(
    {
        cardNum: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        cvv: {
            type: Sequelize.STRING(3),
            allowNull: false
        },
        owner: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        expirationDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        isSelected: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    { sequelize: sequelize, underscored: true, modelName: "paymentInfo" }
)

module.exports = PaymentInfo;