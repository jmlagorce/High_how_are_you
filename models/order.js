module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      custName: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } },
      prodName: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } },
      price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      amount: { type: DataTypes.INTEGER, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false, validation: { min: 1} },
      email: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 }},
    });
    return Order;
  };