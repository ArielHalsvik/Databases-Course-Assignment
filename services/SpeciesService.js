const { sequelize } = require("../models");
const { Sequelize } = require("sequelize");

class SpeciesService {
  constructor(db) {
    this.client = db.sequelize;
    this.Species = db.Species;
    this.Size = db.Size;
    this.db = db;
  }

  /* Insert Speciesdata into Database */
  static async insertSpecies() {
    try {
      const speciesData = require("../public/json/species.json");
      for (const species of speciesData) {
        const query = species.query;
        await sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT,
        });
      }

      console.log("Species inserted successfully");
    } catch (error) {
      throw error;
    }
  }

  /* Get all Species */
  async getAll() {
    try {
      const species = await this.db.Species.findAll();
      return species;
    } catch (error) {
      throw new Error(`Error while fetching species: ${error.message}`);
    }
  }

  /* Delete Species */
  async deleteSpecies(id) {
    await this.Species.destroy({
      where: Sequelize.literal(`
        SpeciesId = ${id} AND NOT EXISTS (
          SELECT SpeciesId
          FROM animals a
          WHERE a.SpeciesId = ${id}
        )
      `),
    });
  }

  /* Create a new Species */
  async create(name, size) {
    try {
      const createSpecies = await this.db.Species.create({
        Species: name,
        Size: size,
      });
      return [createSpecies];
    } catch (error) {
      throw new Error(`Error while creating a species: ${error.message}`);
    }
  }

  /* Update Species */
  async updateSpecies(id, species) {
    try {
      const updatedRow = await this.db.Species.update(
        { Species: species },
        { where: { SpeciesId: id } }
      );
      return updatedRow;
    } catch (error) {
      console.error("Error updating species:", error);
      throw error;
    }
  }
}

module.exports = SpeciesService;