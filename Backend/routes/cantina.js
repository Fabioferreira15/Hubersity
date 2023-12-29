const express = require("express");
const router = express.Router();
const cantinaController = require("../controllers/cantina");
const { body, validationResult } = require("express-validator");


// rota para criar refeições
router.post("/refeicoes", function (req, res) {
  cantinaController.criarRefeicaoCantina(req, res);
});

// rota para ver todas as refeições
router.get("/refeicoes", function (req, res) {
  cantinaController.obterRefeicoesCantina(req, res);
});

//rota marcar refeições
router.post("/marcacao/:id", function (req, res) {
  cantinaController.pagamentoMarcacao(req, res);
});

//rota para obter marcacoes pendentes
router.get("/marcacao/pendentes/:id", function (req, res) {
  cantinaController.obterMarcacoesPendentes(req, res);
});


//rota para obter marcacao indidividual
router.get("/marcacao/:Userid/:idMarcacao", function (req, res) {
  cantinaController.obterMarcacaoIndividual(req, res);
});


module.exports = router;