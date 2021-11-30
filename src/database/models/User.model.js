const { Sequelize } = require("sequelize");
const { sequelize } = require("..");
const Item = require("./Item.model");
const PaymentInfo = require('./PaymentInfo.model');
const StoreOffer = require("./StoreOffer.model");
const BuyRequest = require("./BuyRequest.model");
const ShippingAddress = require("./ShippingAddress.model");
const Token = require("./Token.model");
const Wish = require("./Wish.model");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    password: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: true,
      defaultValue: "None",
    },
    lastChecked: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  { sequelize: sequelize, underscored: true, modelName: "user" }
);

User.hasMany(PaymentInfo, {
    foreignKey: "userId",
    onDelete: "cascade"
  });
PaymentInfo.belongsTo(User);

User.belongsToMany(Item, {
  through: Wish,
  foreignKey: "userId",
  onDelete: "cascade"
});
Item.belongsToMany(User, {
  through: Wish,
  foreignKey: "itemId",
  onDelete: "cascade"
});

User.belongsToMany(StoreOffer, {
  through: BuyRequest
});
StoreOffer.belongsToMany(User, {
  through: BuyRequest
});

User.hasMany(ShippingAddress, {
  foreignKey: "userId",
  onDelete: "cascade"
})
ShippingAddress.belongsTo(User);

User.hasMany(Token, {
  foreignKey: "userId",
});
Token.belongsTo(User);


module.exports = User;

