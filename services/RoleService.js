const { sequelize } = require("../models");

class RoleService {
  
  /* Insert Roledata into Database */
  static async insertRole() {
    try {
      const roleData = require("../public/json/role.json");
      for (const role of roleData) {
        const query = role.query;
        await sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT,
        });
      }

      console.log("Roles inserted successfully");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RoleService;