const express = require("express");
const router = express.Router();
const cantinaController = require("../controllers/cantina");
const { body, validationResult } = require("express-validator");

/**
 * @swagger
 * tags:
 *   name: Cantina
 *   description: Endpoints relacionados à cantina
 */

/**
 * @swagger
 * /cantina/refeicoes:
 *   post:
 *     summary: Criar refeição na cantina
 *     description: Rota para criar uma nova refeição na cantina. Apenas para administradores.
 *     tags:
 *       - Cantina
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               Descricao:
 *                 type: string
 *               TipoPrato:
 *                 type: string
 *               Data:
 *                 type: string
 *               Preco:
 *                 type: number
 *               Periodo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Refeição criada com sucesso!
 *       '400':
 *         description: Dados em falta ou já existe uma refeição para o mesmo tipo de prato e data.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou o utilizador não é um administrador.
 *       '500':
 *         description: Erro interno do servidor ao criar a refeição na cantina.
 */
// rota para criar refeições
router.post("/refeicoes", function (req, res) {
  cantinaController.criarRefeicaoCantina(req, res);
});

/**
 * @swagger
 * /cantina/refeicoes:
 *   get:
 *     summary: Obter refeições da cantina
 *     description: Rota para obter todas as refeições disponíveis na cantina. Pode ser filtrada por data.
 *     tags:
 *       - Cantina
 *     parameters:
 *       - in: query
 *         name: data
 *         description: Filtrar refeições por data (opcional).
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Refeições encontradas! Retorna a lista de refeições da cantina.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido.
 *       '500':
 *         description: Erro interno do servidor ao obter as refeições da cantina.
 */

// rota para ver todas as refeições
router.get("/refeicoes", function (req, res) {
  cantinaController.obterRefeicoesCantina(req, res);
});

/**
 * @swagger
 * /cantina/marcacao/{id}:
 *   post:
 *     summary: Marcar refeição na cantina
 *     description: Rota para marcar uma refeição na cantina. Requer um ID de utilizador e o ID da refeição a ser marcada.
 *     tags:
 *       - Cantina
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do utilizador que está a marcar a refeição
 *       - in: body
 *         name: body
 *         required: true
 *         description: Dados da marcação da refeição
 *         schema:
 *           type: object
 *           properties:
 *             IdRefeicao:
 *               type: integer
 *               description: ID da refeição a ser marcada
 *     responses:
 *       '200':
 *         description: Pagamento efetuado com sucesso! Retorna detalhes do pagamento e da marcação.
 *       '400':
 *         description: Dados em falta, refeição não existe, já tem uma marcação para esta refeição, ou não tem um cartão associado.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou o utilizador não corresponde ao ID fornecido.
 *       '500':
 *         description: Erro interno do servidor ao efetuar o pagamento e a marcação da refeição.
 */

//rota marcar refeições
router.post("/marcacao/:id", function (req, res) {
  cantinaController.pagamentoMarcacao(req, res);
});

/**
 * @swagger
 * /cantina/marcacao/pendentes/{id}:
 *   get:
 *     summary: Obter marcações pendentes na cantina
 *     description: Rota para obter todas as marcações pendentes de um utilizador na cantina. Requer um ID de utilizador.
 *     tags:
 *       - Cantina
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do utilizador para o qual se quer obter as marcações pendentes
 *     responses:
 *       '200':
 *         description: Marcações pendentes encontradas! Retorna detalhes das marcações e das refeições associadas.
 *       '400':
 *         description: Não tem marcações pendentes ou o ID fornecido não corresponde ao utilizador autenticado.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou o utilizador não corresponde ao ID fornecido.
 *       '500':
 *         description: Erro interno do servidor ao obter as marcações pendentes.
 */

//rota para obter marcacoes pendentes
router.get("/marcacao/pendentes/:id", function (req, res) {
  cantinaController.obterMarcacoesPendentes(req, res);
});

/**
 * @swagger
 * /cantina/marcacao/{Userid}/{idMarcacao}:
 *   get:
 *     summary: Obter marcação individual na cantina
 *     description: Rota para obter detalhes de uma marcação individual na cantina. Requer o ID do utilizador e o ID da marcação.
 *     tags:
 *       - Cantina
 *     parameters:
 *       - in: path
 *         name: Userid
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do utilizador para o qual se quer obter a marcação
 *       - in: path
 *         name: idMarcacao
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID da marcação que se quer obter
 *     responses:
 *       '200':
 *         description: Marcação encontrada! Retorna detalhes da marcação e da refeição associada.
 *       '400':
 *         description: Marcação não existe ou o ID fornecido não corresponde ao utilizador autenticado.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido ou o utilizador não corresponde ao ID fornecido.
 *       '500':
 *         description: Erro interno do servidor ao obter a marcação.
 */

//rota para obter marcacao indidividual
router.get("/marcacao/:Userid/:idMarcacao", function (req, res) {
  cantinaController.obterMarcacaoIndividual(req, res);
});

/**
 * @swagger
 * /cantina/historico:
 *   get:
 *     summary: Obter marcações históricas na cantina
 *     description: Rota para obter o histórico de marcações na cantina para o utilizador autenticado.
 *     tags:
 *       - Cantina
 *     parameters:
 *       - in: query
 *         name: numeroRegistos
 *         schema:
 *           type: integer
 *         description: Número de registros a serem retornados. O padrão é 10.
 *       - in: query
 *         name: dataDe
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início para filtrar as marcações históricas. Formato YYYY-MM-DD.
 *       - in: query
 *         name: dataAte
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de término para filtrar as marcações históricas. Formato YYYY-MM-DD.
 *     responses:
 *       '200':
 *         description: Marcações encontradas! Retorna detalhes das marcações, refeições associadas e utilizadores.
 *       '400':
 *         description: Não existem marcações ou erro ao obter as marcações.
 *       '401':
 *         description: Não autorizado. O token de autorização é inválido.
 *       '500':
 *         description: Erro interno do servidor ao obter as marcações históricas.
 */
//rota para obter marcações, histórico
router.get("/historico", function (req, res) {
  cantinaController.obterMarcacoesCantinaHistorico(req, res);
});

module.exports = router;
