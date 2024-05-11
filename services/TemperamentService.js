const { sequelize } = require("../models");
const { Sequelize } = require("sequelize");

class TemperamentService {
  constructor(db) {
    this.client = db.sequelize;
    this.Temperament = db.Temperament;
    this.db = db;
  }

  /* Insert Temperamentdata into Database */
  static async insertTemperament() {
    try {
      const temperamentData = require("../public/json/temperament.json");
      for (const temperament of temperamentData) {
        const query = temperament.query;
        await sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT,
        });
      }

      console.log("Temperament inserted successfully");
    } catch (error) {
      throw error;
    }
  }

  /* Get all Temperaments */
  async getAll() {
    try {
      const temperament = await this.db.Temperament.findAll();
      return temperament;
    } catch (error) {
      throw new Error(`Error while fetching temperaments: ${error.message}`);
    }
  }

  /* Delete Temperament */
  async deleteTemperament(id) {
    await this.Temperament.destroy({
      where: Sequelize.literal(`
      Id = ${id} AND NOT EXISTS (
        SELECT TemperamentId
        FROM animal_temperaments a
        WHERE a.TemperamentId = ${id}
      )
    `),
    });
  }

  /* Create a new Temperament */
  async createTemperament(name) {
    try {
      const createTemperament = await this.db.Temperament.create({
        Temperament: name,
      });
      return [createTemperament];
    } catch (error) {
      throw new Error(`Error while creating a temperament: ${error.message}`);
    }
  }

  /* Update Temperament */
  async updateTemperament(id, temperament) {
    try {
      const updatedRow = await this.db.Temperament.update(
        { Temperament: temperament },
        { where: { Id: id } }
      );
      return updatedRow;
    } catch (error) {
      console.error("Error updating temperament:", error);
      throw error;
    }
  }
}

module.exports = TemperamentService;