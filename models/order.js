module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      prodName: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } },
      price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      amount: { type: DataTypes.INTEGER, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 }},
    });
    return Order;
  };