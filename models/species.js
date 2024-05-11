module.exports = (sequelize, Sequelize) => {
  const Species = sequelize.define(
    "Species",
    {
      SpeciesId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Species: Sequelize.DataTypes.STRING,
      Size: Sequelize.DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return Species;
};