module.exports = (sequelize, Sequelize) => {
  const Animal_Temperament = sequelize.define(
    "Animal_Temperament",
    {
      Id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Animal_Temperament;
};