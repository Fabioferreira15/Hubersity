const express = require("express");
const router = express.Router();
const barController = require("../controllers/bar");
const { body, validationResult } = require("express-validator");

//adicionar novo produto
router.post(
  "/produtos",
  [
    body("Nome").not().isEmpty().withMessage("O nome do produto é obrigatório"),
    body("Preco")
      .not()
      .isEmpty()
      .withMessage("O preço do produto é obrigatório"),
    body("Descricao")
      .not()
      .isEmpty()
      .withMessage("A descrição do produto é obrigatória"),
    body("Categoria")
      .not()
      .isEmpty()
      .withMessage("A categoria do produto é obrigatória"),
    body("Stock")
      .not()
      .isEmpty()
      .withMessage("O stock do produto é obrigatório"),
    body("Stock")
      .isNumeric()
      .withMessage("O stock do produto deve ser um número"),
    body("Stock")
      .isInt()
      .withMessage("O stock do produto deve ser um número inteiro"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    barController.adicionarProduto(req, res);
  }
);

//ver produtos
router.get("/produtos", function (req, res) {
  barController.obterProdutos(req, res);
});

//adicionar produto ao carrinho
router.post("/carrinho/:IdProduto", function (req, res) {
  barController.adicionarProdutoCarrinho(req, res);
});


router.patch("/carrinho/quantidade/:IdProduto", function (req, res) {
  barController.atualizarQuantidadeCarrinho(req, res);
});

//obter carrinho
router.get("/carrinho", function (req, res) {
  barController.obterCarrinho(req, res);
});

router.delete("/carrinho/:IdProduto", function (req, res) {
  barController.apagarProdutoCarrinho(req, res);
});

//pagar carrinho
router.post("/carrinho/pagar/:id", function (req, res) {
  barController.pagarCarrinho(req, res);
});

//ver Pedido individual
router.get("/pedidos/:idPedido", function (req, res) {
  barController.verPedidoIndividual(req, res);
});

//ver pedidos por levantar
router.get("/pedidos", function (req, res) {
  barController.verPedidosPorLevantar(req, res);
});

//ver todos os pedidos histórico
router.get("/pedidos/historico", function (req, res) {
  barController.obterPedidosBarHistorico(req, res);
});
module.exports = router;
