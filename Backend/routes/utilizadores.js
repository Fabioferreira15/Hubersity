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
router.get("/parque-estacionamento/:id", function (req, res) {
  utilizadores.obterDadosPagamento(req, res);
});

module.exports = router;
