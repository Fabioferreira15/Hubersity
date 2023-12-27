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

//rota para obter marcacao indidividual
router.get("/marcacao/:id", function (req, res) {
  cantinaController.obterMarcacaoIndividual(req, res);
});

//rota para obter marcacoes pendentes
router.get("/marcacao/pendentes", function (req, res) {
  cantinaController.obterMarcacoesPendentes(req, res);
});

module.exports = router;