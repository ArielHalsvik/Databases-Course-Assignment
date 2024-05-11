var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const db = require("../models");
const TemperamentService = require("../services/TemperamentService");
const temperamentService = new TemperamentService(db);

const { checkIfAdmin } = require("./authMiddleware");

/* GET Temperaments Page */
router.get("/", checkIfAdmin, async function (req, res, next) {
  const temperament = await temperamentService.getAll();

  res.render("temperament", { user: req.user, temperament: temperament });
});

/* Update Temperament */
router.post("/update", checkIfAdmin, jsonParser, async function (req, res, next) {
    const temperamentId = req.body.id;
    const temperament = req.body.temperament;

    await temperamentService.updateTemperament(temperamentId, temperament);
    res.render("index", { user: req.user });
  }
);

/* Delete Temperament */
router.post("/delete", checkIfAdmin, jsonParser, async function (req, res) {
  const temperamentId = req.body.id;
  await temperamentService.deleteTemperament(temperamentId);
  res.end();
});

/* Add Temperament */
router.post("/add", checkIfAdmin, jsonParser, async function (req, res, next) {
  const name = req.body.name;
  try {
    const temperament = await temperamentService.createTemperament(name);

    res.redirect("/temperament");

    res.render("temperament", { user: req.user, temperament: temperament || {} });
  } catch (error) {
    next(error);
  }
});

module.exports = router;