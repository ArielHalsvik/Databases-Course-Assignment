module.exports = (sequelize, Sequelize) => {
  const Adoption = sequelize.define(
    "Adoption",
    {
      Id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      AdoptionDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: false,
    }
  );

  Adoption.associate = function (models) {
    Adoption.belongsTo(models.User, { foreignKey: "UserId" });
    Adoption.belongsTo(models.Animal, { foreignKey: "AnimalId" });
  };

  return Adoption;
};