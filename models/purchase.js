module.exports = function(sequelize, DataTypes) {
    var Purchase = sequelize.define("Purchase", {
      name: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } },
      price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    });
    return Purchase;
  };
  