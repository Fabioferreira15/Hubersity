const ProdutosBar = require("../models/produtosBar.model").ProdutosBar;
const CategoriasBar = require("../models/categoriasBar.model").CategoriasBar;
const Carrinho = require("../models/carrinho.model").Carrinho;
const CarrinhoItens = require("../models/carrinhoItens.model").CarrinhoItens;
const PedidosBar = require("../models/pedidosBar.model").PedidosBar;
const PedidosBarProdutos = require("../models/pedidosBarProdutos.model").PedidosBarProdutos;
const utilities = require("../utilities/utilities");

//obter produtos do bar
exports.obterProdutos = async function (req, res) {
    // Verificar autenticação
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.UserId) {
        return res.status(401).send({
            message: "Não autorizado.",
        });
    }

    const userId = parseInt(req.params.UserId);

    try {
        // Buscar as categorias do bar
        const categorias = await CategoriasBar.findAll({
            attributes: ["idCategoriaBar", "nome"],
            raw: true,
        });

        // Buscar os produtos do bar agrupados por categoria
        const produtosPorCategoria = await Promise.all(categorias.map(async (categoria) => {
            const produtos = await ProdutosBar.findAll({
                where: { IdCategoria: categoria.idCategoriaBar },
                attributes: ["IdProduto", "Nome", "Descricao", "Preco", "Stock"],
                raw: true,
            });

            return {
                categoria: categoria,
                produtos: produtos,
            };
        }));

        // Responder com os produtos agrupados por categoria
        return res.status(200).json(produtosPorCategoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Ocorreu um erro ao obter os produtos do bar.",
        });
    }
};

//adicionar produto ao carrinho
exports.adicionarProdutoCarrinho = async function (req, res) {
    // Verificar autenticação
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.UserId) {
        return res.status(401).send({
            message: "Não autorizado.",
        });
    }

    const userId = parseInt(req.params.UserId);
    const idProduto = parseInt(req.params.IdProduto);

    try {
        // Verificar se o produto existe
        const produto = await ProdutosBar.findOne({
            where: { IdProduto: idProduto },
            raw: true,
        });

        if (!produto) {
            return res.status(400).send({
                message: "Produto não existe.",
            });
        }

        // Verificar se o produto está em stock
        if (produto.Stock <= 0) {
            return res.status(400).send({
                message: "Produto fora de stock.",
            });
        }

        // Verificar se o produto já está no carrinho
        const produtoCarrinho = await CarrinhoItens.findOne({
            where: { IdProduto: idProduto, IdCarrinho: userId },
            raw: true,
        });

        if (produtoCarrinho) {
            return res.status(400).send({
                message: "Produto já está no carrinho.",
            });
        }

        // Criar carrinho se ainda não existir
        const carrinho = await Carrinho.findOne({
            where: { IdCarrinho: userId },
            raw: true,
        });

        if (!carrinho) {
            await Carrinho.create({
                IdCarrinho: userId,
            });
        }

        // Adicionar produto ao carrinho
        await CarrinhoItens.create({
            IdCarrinho: userId,
            IdProduto: idProduto,
            Quantidade: 1,
        });

        return res.status(200).send({
            message: "Produto adicionado ao carrinho.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Ocorreu um erro ao adicionar o produto ao carrinho.",
        });
    }
};