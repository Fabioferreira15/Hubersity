const express = require("express");
const router = express.Router();
const utilizadores = require("../controllers/utilizadores");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("nome", "O nome é obrigatório!").notEmpty(),
    body("email")
      .notEmpty()
      .withMessage("O e-mail é obrigatório!")
      .isEmail()
      .withMessage("O e-mail não é válido!"),
    body("password")
      .notEmpty()
      .withMessage("A senha é obrigatória!")
      .matches(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)
      .withMessage(
        "A senha deve conter pelo menos uma letra maiúscula, um número e ter pelo menos 6 caracteres."
      ),
    body(
      "confirmarPassword",
      "A confirmação da password é obrigatória!"
    ).notEmpty(),
    body("nomeCurso", "O nome do curso é obrigatório!").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    utilizadores.register(req, res);
  }
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("O e-mail é obrigatório!")
      .isEmail()
      .withMessage("O e-mail não é válido!"),
    body("password").notEmpty().withMessage("A senha é obrigatória!"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    utilizadores.login(req, res);
  }
);

//rota para ver utilizador especifico
router.get("/:id", function (req, res) {
  utilizadores.verPerfil(req, res);
});

//rota obter pagamento do estacionamento
router.get("/parqueestacionamento/:id", function (req, res) {
  utilizadores.obterPagamentoEstacionamento(req, res);
});

//rota pagar estacionamento
router.post("/pagamentoestacionamento/:id", function (req, res) {
  utilizadores.pagarEstacionamento(req, res);
});

//rota de editar perfil
router.patch("/:id", function (req, res) {
  utilizadores.editarPerfil(req, res);
});

//adicionar detalhes Pagamento
router.post("/detalhesPagamento/:id", function (req, res) {
  utilizadores.adicionarDetalhesPagamento(req, res);
});

//obter detalhes Pagamento
router.get("/detalhesPagamento/:id", function (req, res) {
  utilizadores.obterDetalhesPagamento(req, res);
});

//apagar detalhes Pagamento
router.delete("/detalhesPagamento/:id", function (req, res) {
  utilizadores.apagarDetalhesPagamento(req, res);
});

//admin routes
router.get("/", function (req, res) {
  utilizadores.obterUtilizadores(req, res);
});

router.delete("/:id", function (req, res) {
  utilizadores.apagarUtilizador(req, res);
});

module.exports = router;
