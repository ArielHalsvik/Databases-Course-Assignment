const { sequelize } = require("../models");

class AdoptionService {
  constructor(db) {
    this.client = db.sequelize;
    this.AdoptionDate = db.AdoptionDate;
    this.UserId = db.UserId;
    this.AnimalId = db.AnimalId;
    this.db = db;
  }

  /* Insert Adoptions to Database */
  static async insertAdoption() {
    try {
      const adoptionData = require("../public/json/adoption.json");
      for (const adoption of adoptionData) {
        const query = adoption.query;
        await sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT,
        });
      }

      console.log("Adoption inserted successfully");
    } catch (error) {
      throw error;
    }
  }

  /* Create Adoption Records in Database */
  async adoptAnimal(id, userId) {
    try {
      const today = new Date();
      const AdoptionDate = today.toISOString().slice(0, 10);

      const existingAdoption = await this.db.Adoption.findOne({
        where: {
          AnimalId: id,
        },
      });

      if (existingAdoption) {
        console.log("Animal is already adopted");
      } else {
        await this.db.Adoption.create({
          AdoptionDate,
          UserId: userId,
          AnimalId: id,
        });
        console.log("Adoption inserted successfully");
      }
    } catch (error) {
      throw error;
    }
  }

  /* Delete Adoption Records in Database */
  async deleteAdoption(id) {
    try {
      const [deletedRowCount] = await sequelize.query(
        `DELETE FROM adoptions WHERE AnimalId = ${id}`
      );
      return deletedRowCount;
    } catch (error) {
      throw new Error(
        `Error while deleting adoption records: ${error.message}`
      );
    }
  }
}

module.exports = AdoptionService;