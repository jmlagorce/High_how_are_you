module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      userName: { type: DataTypes.STRING, allowNull: false, validation: { len: [1, 90] } },
      password: { type: DataTypes.STRING, allowNull: false, validation: { min: 1 } }
    });
    return User;
  };