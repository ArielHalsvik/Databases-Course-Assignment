const { sequelize } = require("../models");

class AnimalService {
  constructor(db) {
    this.client = db.sequelize;
    this.Name = db.Name;
    this.Birthday = db.Birthday;
    this.db = db;
  }

  /* Insert Animals to Database */
  static async insertAnimal() {
    try {
      const animalData = require("../public/json/animal.json");
      for (const animal of animalData) {
        const query = animal.query;
        await sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT,
        });
      }

      console.log("Animal inserted successfully");
    } catch (error) {
      throw error;
    }
  }

  /* Input all Animal Information to Table */
  async getAll() {
    try {
      const animals = await this.db.sequelize.query(
        `
            SELECT 
            a.Id AS Id, 
            a.Name AS Name, 
            s.Species AS Species, 
            DATE(a.Birthday) AS Birthday, 
            GROUP_CONCAT(DISTINCT t.temperament ORDER BY t.temperament SEPARATOR ', ') AS Temperaments,
            s.Size AS Size, 
            FLOOR(DATEDIFF(CURRENT_DATE(), a.Birthday) / 365) AS Age,
            CASE 
                WHEN ad.AnimalId IS NOT NULL THEN 'TRUE' 
                ELSE 'FALSE' 
            END AS Adopted
            FROM 
            animals a
            LEFT JOIN 
            species s ON a.SpeciesId = s.SpeciesId
            LEFT JOIN 
            animal_temperaments a_t ON a.Id = a_t.AnimalId
            LEFT JOIN 
            temperaments t ON a_t.TemperamentId = t.Id
            LEFT JOIN 
            adoptions ad ON a.Id = ad.AnimalId
            GROUP BY 
            a.Id, a.Name, s.Species, a.Birthday, s.Size, ad.AnimalId;
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return animals;
    } catch (error) {
      throw new Error(`Error while fetching animals: ${error.message}`);
    }
  }

  /* Finds Animals Born in a Date Range */
  async animalsBornInDateRange(dateFrom, dateTo) {
    try {
      const animals = await this.db.sequelize.query(
        `
        SELECT 
        a.Id AS Id, 
        a.Name AS Name, 
        s.Species AS Species, 
        DATE(a.Birthday) AS Birthday, 
        GROUP_CONCAT(DISTINCT t.temperament ORDER BY t.temperament SEPARATOR ', ') AS Temperaments,
        s.Size AS Size, 
        FLOOR(DATEDIFF(CURRENT_DATE(), a.Birthday) / 365) AS Age,
        CASE 
            WHEN ad.AnimalId IS NOT NULL THEN 'TRUE' 
            ELSE 'FALSE' 
        END AS Adopted
        FROM 
            animals a
        LEFT JOIN 
            species s ON a.SpeciesId = s.SpeciesId
        LEFT JOIN 
            animal_temperaments a_t ON a.Id = a_t.AnimalId
        LEFT JOIN 
            temperaments t ON a_t.TemperamentId = t.Id
        LEFT JOIN 
            adoptions ad ON a.Id = ad.AnimalId
        WHERE 
            a.Birthday BETWEEN '${dateFrom}' AND '${dateTo}'
        GROUP BY 
            Id, Name, Species, Birthday, Size, Adopted;
      `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return animals;
    } catch (error) {
      throw new Error(`Error while fetching animals: ${error.message}`);
    }
  }

  /* Sorts Table by Popular Animal Names */
  async popularAnimals() {
    try {
      const animals = await this.db.sequelize.query(
        `
          SELECT 
          a.Id AS Id, 
          a.Name AS Name,
          popularity.Popularity AS Popularity,
          s.Species AS Species, 
          DATE(a.Birthday) AS Birthday, 
          GROUP_CONCAT(DISTINCT t.temperament ORDER BY t.temperament SEPARATOR ', ') AS Temperaments,
          s.Size AS Size, 
          FLOOR(DATEDIFF(CURRENT_DATE(), a.Birthday) / 365) AS Age,
          CASE 
              WHEN ad.AnimalId IS NOT NULL THEN 'TRUE' 
              ELSE 'FALSE' 
          END AS Adopted
          FROM 
              animals a
          LEFT JOIN 
              species s ON a.SpeciesId = s.SpeciesId
          LEFT JOIN 
              animal_temperaments a_t ON a.Id = a_t.AnimalId
          LEFT JOIN 
              temperaments t ON a_t.TemperamentId = t.Id
          LEFT JOIN 
              adoptions ad ON a.Id = ad.AnimalId
          JOIN 
              (SELECT Name, COUNT(*) AS Popularity FROM animals GROUP BY Name) AS popularity ON a.Name = popularity.Name
          GROUP BY 
              a.Name, a.Id
          ORDER BY 
              Popularity DESC;
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return animals;
    } catch (error) {
      throw new Error(`Error while fetching animals: ${error.message}`);
    }
  }

  /* Finds Adopted Animals */
  async adoptedAnimals() {
    try {
      const animals = await this.db.sequelize.query(
        `
          SELECT 
          a.Id AS Id, 
          a.Name AS Name, 
          s.Species AS Species, 
          DATE(a.Birthday) AS Birthday, 
          GROUP_CONCAT(DISTINCT t.temperament ORDER BY t.temperament SEPARATOR ', ') AS Temperaments,
          s.Size AS Size, 
          FLOOR(DATEDIFF(CURRENT_DATE(), a.Birthday) / 365) AS Age,
          CASE 
              WHEN ad.AnimalId IS NOT NULL THEN 'TRUE' 
              ELSE 'FALSE' 
          END AS Adopted
          FROM 
              animals a
          LEFT JOIN 
              species s ON a.SpeciesId = s.SpeciesId
          LEFT JOIN 
              animal_temperaments a_t ON a.Id = a_t.AnimalId
          LEFT JOIN 
              temperaments t ON a_t.TemperamentId = t.Id
          LEFT JOIN 
              adoptions ad ON a.Id = ad.AnimalId
          WHERE 
              ad.AnimalId = a.Id
          GROUP BY 
              Id, Name, Species, Birthday, Size, Adopted;
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return animals;
    } catch (error) {
      throw new Error(`Error while fetching animals: ${error.message}`);
    }
  }

  /* Sorts Table by Animals Age */
  async animalsByAge() {
    try {
      const animals = await this.db.sequelize.query(
        `
          SELECT 
          a.Id AS Id, 
          a.Name AS Name, 
          s.Species AS Species, 
          DATE(a.Birthday) AS Birthday, 
          GROUP_CONCAT(DISTINCT t.temperament ORDER BY t.temperament SEPARATOR ', ') AS Temperaments,
          s.Size AS Size, 
          FLOOR(DATEDIFF(CURRENT_DATE(), a.Birthday) / 365) AS Age,
          CASE 
              WHEN ad.AnimalId IS NOT NULL THEN 'TRUE' 
              ELSE 'FALSE' 
          END AS Adopted
          FROM 
              animals a
          LEFT JOIN 
              species s ON a.SpeciesId = s.SpeciesId
          LEFT JOIN 
              animal_temperaments a_t ON a.Id = a_t.AnimalId
          LEFT JOIN 
              temperaments t ON a_t.TemperamentId = t.Id
          LEFT JOIN 
              adoptions ad ON a.Id = ad.AnimalId
          GROUP BY 
              Id, Name, Species, Birthday, Size, Adopted
          ORDER BY 
              Age;
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return animals;
    } catch (error) {
      throw new Error(`Error while fetching animals: ${error.message}`);
    }
  }

  /* Finds Number of Animals per Size */
  async animalsPerSize() {
    try {
      const animals = await this.db.sequelize.query(
        `
          SELECT 
          s.Size AS Animal_Size,
          COUNT(*) AS Number_of_Animals
          FROM 
              animals a
          JOIN 
              species s ON a.SpeciesId = s.SpeciesId
          GROUP BY 
              Animal_Size;
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return animals;
    } catch (error) {
      throw new Error(`Error while fetching animals: ${error.message}`);
    }
  }
}

module.exports = AnimalService;