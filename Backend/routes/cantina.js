const express = require("express");
const router = express.Router();
const cantinaController = require("../controllers/cantina");
const { body, validationResult } = require("express-validator");

// rota para ver todas as refeições
router.get("/refeicoes", function (req, res) {
  cantinaController.findAll(req, res);
});

module.exports = router;