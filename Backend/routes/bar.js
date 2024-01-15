const express = require("express");
const router = express.Router();
const barController = require("../controllers/bar");
const { body, validationResult } = require("express-validator");

/**
 * @swagger
 * tags:
 *   name: Bar
 *   description: Endpoints relacionados ao Bar
 */

/**
 * @swagger
 * /bar/produtos:
 *   post:
 *     summary: Adicionar novo produto no bar
 *     description: Rota para adicionar um novo produto ao menu do bar.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               Descricao:
 *                 type: string
 *               Preco:
 *                 type: number
 *               Categoria:
 *                 type: string
 *               Stock:
 *                 type: integer
 *             example:
 *               Nome: "Nome do Produto"
 *               Descricao: "Descrição do Produto"
 *               Preco: 10.99
 *               Categoria: "Categoria do Produto"
 *               Stock: 50
 *     responses:
 *       '201':
 *         description: Produto adicionado com sucesso. Retorna detalhes do produto.
 *       '400':
 *         description: Erros de validação ou produto já existe ou categoria não existe.
 *       '401':
 *         description: Token inválido ou sem permissões de administrador.
 *       '500':
 *         description: Erro interno do servidor ao adicionar o produto.
 */

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

/**
 * @swagger
 * /bar/categorias:
 *   post:
 *     summary: Adicionar nova categoria no bar
 *     description: Rota para adicionar uma nova categoria ao menu do bar.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *             example:
 *               Nome: "Nome da Categoria"
 *     responses:
 *       '201':
 *         description: Categoria adicionada com sucesso. Retorna detalhes da categoria.
 *       '400':
 *         description: Erros de validação ou categoria já existe.
 *       '401':
 *         description: Token inválido ou sem permissões de administrador.
 *       '500':
 *         description: Erro interno do servidor ao adicionar a categoria.
 */
//adicionar nova categoria
router.post(
  "/categorias",
  [
    body("Nome")
      .not()
      .isEmpty()
      .withMessage("O nome da categoria é obrigatório"),
  ],
  function (req, res) {
    barController.adicionarCategoria(req, res);
  }
);

/**
 * @swagger
 * /bar/produtos:
 *   get:
 *     summary: Obter produtos do bar
 *     description: Rota para obter a lista de produtos disponíveis no bar agrupados por categoria.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Produtos obtidos com sucesso. Retorna a lista de produtos agrupados por categoria.
 *       '401':
 *         description: Token inválido.
 *       '404':
 *         description: Nenhum produto encontrado.
 *       '500':
 *         description: Erro interno do servidor ao obter os produtos do bar.
 */

//ver produtos
router.get("/produtos", function (req, res) {
  barController.obterProdutos(req, res);
});

/**
 * @swagger
 * /bar/carrinho/{IdProduto}:
 *   post:
 *     summary: Adicionar produto ao carrinho
 *     description: Rota para adicionar um produto ao carrinho de compras do utilizador.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: IdProduto
 *         required: true
 *         description: ID do produto que será adicionado ao carrinho.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Produto adicionado ao carrinho com sucesso.
 *       '401':
 *         description: Token inválido.
 *       '400':
 *         description: Produto não existe ou está fora de stock.
 *       '500':
 *         description: Erro interno do servidor ao adicionar o produto ao carrinho.
 */

//adicionar produto ao carrinho
router.post("/carrinho/:IdProduto", function (req, res) {
  barController.adicionarProdutoCarrinho(req, res);
});

/**
 * @swagger
 * /bar/carrinho:
 *   get:
 *     summary: Obter carrinho
 *     description: Rota para obter os produtos no carrinho de compras do utilizador.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Produtos no carrinho obtidos com sucesso.
 *       '401':
 *         description: Token inválido.
 *       '404':
 *         description: Nenhum produto encontrado no carrinho.
 *       '500':
 *         description: Erro interno do servidor ao obter os produtos do carrinho.
 */
//obter carrinho
router.get("/carrinho", function (req, res) {
  barController.obterCarrinho(req, res);
});

/**
 * @swagger
 * /bar/carrinho/{IdProduto}:
 *   delete:
 *     summary: Remover produto do carrinho
 *     description: Rota para remover um produto do carrinho de compras do utilizador.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: IdProduto
 *         required: true
 *         description: ID do produto a ser removido do carrinho.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Produto removido do carrinho com sucesso.
 *       '400':
 *         description: Produto não existe ou não está no carrinho.
 *       '401':
 *         description: Token inválido.
 *       '500':
 *         description: Erro interno do servidor ao remover o produto do carrinho.
 */

router.delete("/carrinho/:IdProduto", function (req, res) {
  barController.apagarProdutoCarrinho(req, res);
});

/**
 * @swagger
 * /bar/carrinho/pagar/{id}:
 *   post:
 *     summary: Pagar carrinho
 *     description: Rota para processar o pagamento e criar um pedido para os produtos no carrinho.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do utilizador para o qual o carrinho pertence.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pagamento e pedido processados com sucesso.
 *       '400':
 *         description: Carrinho vazio, nenhum cartão associado ou outros problemas de validação.
 *       '401':
 *         description: Token inválido ou não autorizado.
 *       '404':
 *         description: Utilizador ou carrinho não existe.
 *       '500':
 *         description: Erro interno do servidor ao processar o pagamento e criar o pedido.
 */

//pagar carrinho
router.post("/carrinho/pagar/:id", function (req, res) {
  barController.pagarCarrinho(req, res);
});

//ver Pedido individual
router.get("/pedidos/:idPedido", function (req, res) {
  barController.verPedidoIndividual(req, res);
});

/**
 * @swagger
 * /bar/pedidos:
 *   get:
 *     summary: Ver pedidos por levantar
 *     description: Rota para obter os pedidos por levantar de um utilizador autenticado.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Pedidos por levantar encontrados.
 *         content:
 *           application/json:
 *             example:
 *               message: Pedidos por levantar encontrados
 *               pedidos:
 *                 - IdPedido: 1
 *                   Data: "2024-01-15"
 *                   Status: "pendente"
 *                   QRCode: "..."
 *                   produtos:
 *                     - IdProduto: 1
 *                       Nome: "Produto 1"
 *                       Descricao: "Descrição do Produto 1"
 *                       Preco: 10.0
 *                       Stock: 5
 *                       PedidosBarProdutos:
 *                         Quantidade: 2
 *                     - IdProduto: 2
 *                       Nome: "Produto 2"
 *                       Descricao: "Descrição do Produto 2"
 *                       Preco: 15.0
 *                       Stock: 8
 *                       PedidosBarProdutos:
 *                         Quantidade: 1
 *       '204':
 *         description: Nenhum pedido por levantar.
 *       '401':
 *         description: Token inválido ou não autorizado.
 *       '500':
 *         description: Erro interno do servidor ao obter os pedidos por levantar.
 */

//ver pedidos por levantar
router.get("/pedidos", function (req, res) {
  barController.verPedidosPorLevantar(req, res);
});

/**
 * @swagger
 * /bar/historico:
 *   get:
 *     summary: Ver todos os pedidos históricos
 *     description: Rota para obter todos os pedidos históricos de um utilizador autenticado no bar.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: numeroRegistos
 *         schema:
 *           type: integer
 *         description: Número de registros a serem retornados (opcional, padrão: 10).
 *       - in: query
 *         name: dataDe
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início para filtro (opcional).
 *       - in: query
 *         name: dataAte
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de término para filtro (opcional).
 *     responses:
 *       '200':
 *         description: Pedidos históricos encontrados.
 *         content:
 *           application/json:
 *             example:
 *               - IdPedido: 1
 *                 Data: "2024-01-15"
 *                 Status: "concluido"
 *                 PedidosBarProdutos:
 *                   - IdProduto: 1
 *                     Quantidade: 2
 *                     ProdutosBar:
 *                       IdProduto: 1
 *                       Nome: "Produto 1"
 *                       Descricao: "Descrição do Produto 1"
 *                       Preco: 10.0
 *                       Stock: 5
 *                   - IdProduto: 2
 *                     Quantidade: 1
 *                     ProdutosBar:
 *                       IdProduto: 2
 *                       Nome: "Produto 2"
 *                       Descricao: "Descrição do Produto 2"
 *                       Preco: 15.0
 *                       Stock: 8
 *       '204':
 *         description: Nenhum pedido histórico encontrado.
 *       '401':
 *         description: Token inválido ou não autorizado.
 *       '500':
 *         description: Erro interno do servidor ao obter os pedidos históricos.
 */

//ver todos os pedidos histórico
router.get("/historico", function (req, res) {
  barController.obterPedidosBarHistorico(req, res);
});

/**
 * @swagger
 * /bar/carrinho/quantidade/{IdProduto}:
 *   patch:
 *     summary: Alterar quantidade do produto no carrinho
 *     description: Rota para alterar a quantidade de um produto no carrinho de um utilizador autenticado no bar.
 *     tags:
 *       - Bar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: IdProduto
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto a ser alterado no carrinho.
 *       - in: query
 *         name: operacao
 *         schema:
 *           type: string
 *         enum: [aumentar, diminuir]
 *         required: true
 *         description: Operação a ser realizada na quantidade do produto no carrinho (aumentar ou diminuir).
 *     responses:
 *       '200':
 *         description: Quantidade do produto alterada com sucesso.
 *       '400':
 *         description: Operação inválida, produto não existe, produto não está no carrinho, ou quantidade superior ao estoque.
 *       '401':
 *         description: Token inválido ou não autorizado.
 *       '500':
 *         description: Erro interno do servidor ao alterar a quantidade do produto no carrinho.
 */
//alterar quantidade do produto no carrinho
router.patch("/carrinho/quantidade/:IdProduto", function (req, res) {
  barController.alterarQuantidadeProdutoCarrinho(req, res);
});

module.exports = router;
