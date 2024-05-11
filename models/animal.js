module.exports = (sequelize, Sequelize) => {
  const Animal = sequelize.define(
    "Animal",
    {
      Id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: Sequelize.DataTypes.STRING,
      Birthday: Sequelize.DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );

  Animal.associate = (models) => {
    Animal.belongsToMany(models.Temperament, {
      through: models.Animal_Temperament,
      foreignKey: "AnimalId",
    });

    Animal.belongsTo(models.Species, { foreignKey: "SpeciesId" });

    Animal.hasOne(models.Adoption, { foreignKey: "AnimalId" });
  };
  return Animal;
};