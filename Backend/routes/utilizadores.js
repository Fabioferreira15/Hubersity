const express = require("express");
const router = express.Router();
const utilizadores = require("../controllers/utilizadores");
const { body, validationResult } = require("express-validator");

/**
 * @swagger
 * tags:
 *   name: Utilizadores
 *   description: Endpoints relacionados aos utilizadores
 */

/**
 * @swagger
 * /utilizadores/registo:
 *   post:
 *     summary: Registar um novo utilizador
 *     description: Função do controlador para lidar com o registo do utilizador.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: Informações do utilizador para registo.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             confirmarPassword:
 *               type: string
 *             nomeCurso:
 *               type: string
 *     responses:
 *       '200':
 *         description: Utilizador registado com sucesso.
 *       '400':
 *         description: Pedido inválido. Verifique o corpo do pedido para erros de validação.
 *       '404':
 *         description: Curso não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */

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

/**
 * @swagger
 * tags:
 *   name: Utilizadores
 *   description: Endpoints relacionados aos utilizadores
 */

/**
 * @swagger
 * /utilizadores/login:
 *   post:
 *     summary: Autenticar um utilizador
 *     description: Endpoint para autenticar um utilizador utilizando e-mail e senha.
 *     tags:
 *       - Utilizadores
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login efetuado com sucesso. Retorna um token de autenticação e informações do utilizador.
 *       '400':
 *         description: Utilizador não encontrado, ou senha incorreta. Verifique as credenciais fornecidas.
 *       '500':
 *         description: Erro interno do servidor ao fazer login.
 */

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

/**
 * @swagger
 * /utilizadores/{id}:
 *   get:
 *     summary: Obter informações de um utilizador específico
 *     description: Rota para obter informações detalhadas de um utilizador com base no ID.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador a ser consultado.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Informações do utilizador obtidas com sucesso.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou não corresponde ao utilizador.
 *       '404':
 *         description: Utilizador não encontrado.
 *       '500':
 *         description: Erro interno do servidor ao buscar o utilizador.
 */

//rota para ver utilizador especifico
router.get("/:id", function (req, res) {
  utilizadores.verPerfil(req, res);
});

/**
 * @swagger
 * /utilizadores/parqueestacionamento/{id}:
 *   get:
 *     summary: Obter informações do pagamento do estacionamento de um utilizador
 *     description: Rota para obter informações sobre o pagamento do estacionamento de um utilizador com base no ID.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador para o qual se deseja obter informações do pagamento do estacionamento.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Estacionamento encontrado! Retorna as informações do pagamento do estacionamento.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou não corresponde ao utilizador.
 *       '200':
 *         description: Ainda não efetuou o pagamento do estacionamento. Retorna uma mensagem informativa.
 *       '500':
 *         description: Erro interno do servidor ao buscar informações do pagamento do estacionamento.
 */

//rota obter pagamento do estacionamento
router.get("/parqueestacionamento/:id", function (req, res) {
  utilizadores.obterPagamentoEstacionamento(req, res);
});

/**
 * @swagger
 * /utilizadores/pagamentoestacionamento/{id}:
 *   post:
 *     summary: Efetuar pagamento do estacionamento
 *     description: Rota para efetuar o pagamento do estacionamento de um utilizador.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador para o qual se deseja efetuar o pagamento do estacionamento.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pagamento efetuado com sucesso! Retorna detalhes do pagamento e estacionamento.
 *       '400':
 *         description: Já efetuou o pagamento do estacionamento ou não tem nenhum cartão associado.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou não corresponde ao utilizador.
 *       '404':
 *         description: Utilizador não encontrado.
 *       '500':
 *         description: Erro interno do servidor ao pagar o estacionamento.
 */

//rota pagar estacionamento
router.post("/pagamentoestacionamento/:id", function (req, res) {
  utilizadores.pagarEstacionamento(req, res);
});

/**
 * @swagger
 * /utilizadores/{id}:
 *   patch:
 *     summary: Editar o perfil de um utilizador
 *     description: Rota para editar o perfil de um utilizador com base no ID.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador para o qual se deseja editar o perfil.
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Perfil editado com sucesso! Retorna detalhes do utilizador atualizado.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou não corresponde ao utilizador.
 *       '404':
 *         description: Utilizador não encontrado.
 *       '500':
 *         description: Erro interno do servidor ao editar o perfil.
 */

//rota de editar perfil
router.patch("/:id", function (req, res) {
  utilizadores.editarPerfil(req, res);
});

/**
 * @swagger
 * /utilizadores/detalhesPagamento/{id}:
 *   post:
 *     summary: Adicionar detalhes de pagamento
 *     description: Rota para adicionar detalhes de pagamento associados a um utilizador.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador para o qual se deseja adicionar detalhes de pagamento.
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NumeroCartao:
 *                 type: string
 *               CVV:
 *                 type: string
 *               DataValidade:
 *                 type: string
 *               NomeTitular:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Cartão adicionado com sucesso.
 *       '400':
 *         description: Já tem um cartão associado ou dados em falta na requisição.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou não corresponde ao utilizador.
 *       '500':
 *         description: Erro interno do servidor ao adicionar detalhes de pagamento.
 */

//adicionar detalhes Pagamento
router.post("/detalhesPagamento/:id", function (req, res) {
  utilizadores.adicionarDetalhesPagamento(req, res);
});

/**
 * @swagger
 * /utilizadores/detalhesPagamento/{id}:
 *   get:
 *     summary: Obter detalhes de pagamento
 *     description: Rota para obter detalhes de pagamento associados a um utilizador.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador para o qual se deseja obter detalhes de pagamento.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Cartão encontrado. Retorna os detalhes do cartão associado ao utilizador.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou não corresponde ao utilizador.
 *       '404':
 *         description: Utilizador não encontrado ou ainda não tem nenhum cartão associado.
 *       '500':
 *         description: Erro interno do servidor ao obter detalhes de pagamento.
 */

//obter detalhes Pagamento
router.get("/detalhesPagamento/:id", function (req, res) {
  utilizadores.obterDetalhesPagamento(req, res);
});

/**
 * @swagger
 * /utilizadores/detalhesPagamento/{id}:
 *   delete:
 *     summary: Apagar detalhes de pagamento
 *     description: Rota para apagar os detalhes de pagamento associados a um utilizador.
 *     tags:
 *       - Utilizadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador para o qual se deseja apagar os detalhes de pagamento.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Cartão apagado com sucesso.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou não corresponde ao utilizador.
 *       '404':
 *         description: Não tem nenhum cartão associado ou utilizador não encontrado.
 *       '500':
 *         description: Erro interno do servidor ao apagar detalhes de pagamento.
 */
//apagar detalhes Pagamento
router.delete("/detalhesPagamento/:id", function (req, res) {
  utilizadores.apagarDetalhesPagamento(req, res);
});

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints relacionados à administração
 */

/**
 * @swagger
 * /utilizadores/:
 *   get:
 *     summary: Obter todos os utilizadores
 *     description: Rota para obter todos os utilizadores. Apenas para administração.
 *     tags:
 *       - Admin
 *     responses:
 *       '200':
 *         description: Utilizadores encontrados! Retorna a lista de todos os utilizadores.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou o utilizador não é um administrador.
 *       '500':
 *         description: Erro interno do servidor ao buscar os utilizadores.
 */

//admin routes
router.get("/", function (req, res) {
  utilizadores.obterUtilizadores(req, res);
});


/**
 * @swagger
 * /utilizadores/{id}:
 *   delete:
 *     summary: Apagar utilizador
 *     description: Rota para apagar um utilizador. Apenas para administração.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador que se deseja apagar.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Utilizador apagado com sucesso!
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou o utilizador não é um administrador.
 *       '404':
 *         description: Utilizador não encontrado.
 *       '500':
 *         description: Erro interno do servidor ao apagar o utilizador.
 */


router.delete("/:id", function (req, res) {
  utilizadores.apagarUtilizador(req, res);
});

module.exports = router;
