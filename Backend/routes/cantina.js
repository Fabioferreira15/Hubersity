const express = require("express");
const router = express.Router();
const cantinaController = require("../controllers/cantina");
const { body, validationResult } = require("express-validator");

// rota para ver todas as refeições
router.get("/refeicoes", function (req, res) {
  cantinaController.obterRefeicoesCantina(req, res);
});

//rota marcar refeições
router.post("/marcacao", function (req, res) {
  cantinaController.marcarRefeicao(req, res);
});

module.exports = router;