var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const db = require("../models");
const SpeciesService = require("../services/SpeciesService");
const speciesService = new SpeciesService(db);

const { checkIfAdmin } = require("./authMiddleware");

/* GET Species Page */
router.get("/", checkIfAdmin, async function (req, res, next) {
  const species = await speciesService.getAll();

  res.render("species", { user: req.user, species: species });
});

/* Update Species */
router.post("/update", checkIfAdmin, jsonParser, async function (req, res, next) {
    const speciesId = req.body.id;
    const species = req.body.species;

    await speciesService.updateSpecies(speciesId, species);
    res.render("index", { user: req.user, species: species });
  }
);

/* Delete Species */
router.post("/delete", checkIfAdmin, jsonParser, async function (req, res) {
  const speciesId = req.body.id;
  await speciesService.deleteSpecies(speciesId);
  res.end();
});

/* Add Species */
router.post("/add", checkIfAdmin, jsonParser, async function (req, res, next) {
  const name = req.body.name;
  const size = req.body.size;
  try {
    const species = await speciesService.create(name, size);

    res.redirect("/species");

    res.render("species", { user: req.user, species: species || {} });
  } catch (error) {
    next(error);
  }
});

module.exports = router;