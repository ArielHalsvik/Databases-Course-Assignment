var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const db = require("../models");

const AnimalService = require("../services/AnimalService");
const animalService = new AnimalService(db);
const AdoptionService = require("../services/AdoptionService");
const adoptionService = new AdoptionService(db);

const { checkIfAdmin, checkIfMember } = require("./authMiddleware");

let dateRange = [];

/* GET Animals Page */
router.get("/", async function (req, res, next) {
  const animals = await animalService.getAll();

  res.render("animals", { user: req.user, animals: animals });
});

/* Adoption Create and Delete */
router.post("/adopt", checkIfMember, jsonParser, async function (req, res, next) {
    await adoptionService.adoptAnimal(req.body.id, req.user.id);

    res.end();
  }
);

router.post("/delete", checkIfAdmin, jsonParser, async function (req, res) {
  await adoptionService.deleteAdoption(req.body.id);

  res.end();
});

/* Query Selector - Adopted Animals */
router.get("/adopted", async function (req, res, next) {
  const adoptedAnimals = await animalService.adoptedAnimals();

  res.render("animals", { user: req.user, animals: adoptedAnimals });
});

/* Query Selector - Animals by Age */
router.get("/age", async function (req, res, next) {
  const byAge = await animalService.animalsByAge();

  res.render("animals", { user: req.user, animals: byAge });
});

/* Query Selector - Popular Animal Names */
router.get("/popularity", async function (req, res, next) {
  const popularity = await animalService.popularAnimals();

  res.render("animals", { user: req.user, animals: popularity });
});

/* Query Selector - Animals Per Size */
router.post("/size", checkIfAdmin, jsonParser, async function (req, res, next) {
  const dateRange = await animalService.animalsPerSize();

  res.json(dateRange);
});

/* Query Selector - Animals Born in Date Range */
router.get("/born", async function (req, res, next) {
  res.render("animals", { user: req.user, animals: dateRange });
});

router.post("/born", jsonParser, async function (req, res, next) {
  try {
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;

    dateRange = await animalService.animalsBornInDateRange(dateFrom, dateTo);

    res.render("animals", { user: req.user, animals: dateRange });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;