const express = require("express");
const router = express.Router();
const barController = require("../controllers/bar");
const { body, validationResult } = require("express-validator");

//ver produtos
router.get("/produtos", function (req, res) {
  barController.obterProdutos(req, res);
});

module.exports = router;