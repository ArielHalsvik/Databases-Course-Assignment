const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
require("dotenv").config();
const db = {};

const connection = {
  database: process.env.DATABASE_NAME,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  dialectmodel: process.env.DIALECTMODEL,
};
const sequelize = new Sequelize(connection);

db.sequelize = sequelize;

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (
    file.indexOf(".") === 0 ||
    file === basename ||
    file.slice(-3) !== ".js"
  ) {
    continue;
  }

  const model = require(path.join(__dirname, file))(sequelize, Sequelize);
  db[model.name] = model;
}

for (const model of Object.values(db)) {
  if (model.associate) {
    model.associate(db);
  }
}

module.exports = db;