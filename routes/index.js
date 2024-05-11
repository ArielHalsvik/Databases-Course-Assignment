var express = require("express");
var router = express.Router();
const db = require("../models");
const { sequelize } = require("../models");

const UserService = require("../services/UserService");
const AnimalService = require("../services/AnimalService");
const SpeciesService = require("../services/SpeciesService");
const RoleService = require("../services/RoleService");
const AdoptionService = require("../services/AdoptionService");
const TemperamentService = require("../services/TemperamentService");
const AnimalTemperamentService = require("../services/AnimalTemperamentService");

/* GET home page */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Express", user: req.user });
});

/* Populate Database */
router.post("/populate_database", async function (req, res, next) {
  if (await checkDBForData()) {
    console.log("Database is empty, populating now.");

    try {
      await RoleService.insertRole();
      await UserService.insertUser();
      await SpeciesService.insertSpecies();
      await AnimalService.insertAnimal();
      await TemperamentService.insertTemperament();
      await AdoptionService.insertAdoption();
      await AnimalTemperamentService.insertAnimalTemperament();
    } catch (error) {
      console.error("Error populating users:", error);
    }
  } else {
    console.log("Database is already populated with some data.");
  }
  res.end();
});

const checkDBForData = async function () {
  let animals = await db.sequelize.query(
    "SELECT COUNT(*) as total FROM animals",
    {
      raw: true,
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (animals[0].total == 0) {
    return true;
  }

  return false;
};

module.exports = router;