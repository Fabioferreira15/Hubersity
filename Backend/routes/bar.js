const express = require("express");
const router = express.Router();
const barController = require("../controllers/bar");
const { body, validationResult } = require("express-validator");

//ver produtos
router.get("/produtos", function (req, res) {
  barController.obterProdutos(req, res);
});

//adicionar produto ao carrinho
router.post("/carrinho", function (req, res) {
  barController.adicionarProdutoCarrinho(req, res);
});
module.exports = router;