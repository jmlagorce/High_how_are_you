module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } },
    type: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } },
    mood: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    strainId: { type: DataTypes.INTEGER, allowNull: false}
  });
  return Product;
};
