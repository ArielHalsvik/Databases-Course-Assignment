const { sequelize } = require("../models");

class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User;
  }

  /* Insert Userdata into Database */
  static async insertUser() {
    try {
      const userData = require("../public/json/user.json");
      for (const user of userData) {
        const query = user.query;
        await sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT,
        });
      }

      console.log("Users inserted successfully");
    } catch (error) {
      throw error;
    }
  }

  /* Get Username */
  async getOne(username) {
    return await this.User.findOne({
      where: { username: username },
    });
  }

  /* Create new User */
  async create(firstname, lastname, username, password) {
    try {
      const createUser = await this.User.create({
        FullName: firstname + " " + lastname,
        Username: username,
        Password: password,
      });
      return [createUser];
    } catch (error) {
      throw new Error(`Error while creating a user: ${error.message}`);
    }
  }
}

module.exports = UserService;