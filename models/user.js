module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      Id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      FullName: Sequelize.DataTypes.STRING,
      Username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      RoleId: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 2,
      },
    },
    {
      timestamps: false,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Adoption, { foreignKey: "UserId" });
    User.belongsTo(models.Role, { foreignKey: "RoleId" });
  };
  return User;
};