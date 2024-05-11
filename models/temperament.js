module.exports = (sequelize, Sequelize) => {
  const Temperament = sequelize.define(
    "Temperament",
    {
      Id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Temperament: Sequelize.DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  Temperament.associate = (models) => {
    Temperament.belongsToMany(models.Animal, {
      through: models.Animal_Temperament,
    });
  };

  return Temperament;
};