const { sequelize } = require("../models");

class AnimalTemperamentService {
  
  /* Insert Animal Temperament Data into Database */
  static async insertAnimalTemperament() {
    try {
      const temperamentData = require("../public/json/animal_temperament.json");
      for (const temperament of temperamentData) {
        const query = temperament.query;
        await sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT,
        });
      }

      console.log("Animal temperament inserted successfully");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AnimalTemperamentService;