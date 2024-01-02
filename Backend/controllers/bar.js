const ProdutosBar = require("../models/produtosBar.model").ProdutosBar;
const CategoriasBar = require("../models/categoriasBar.model").CategoriasBar;
const Carrinho = require("../models/carrinho.model").Carrinho;
const CarrinhoItens = require("../models/carrinhoItens.model").CarrinhoItens;
const PedidosBar = require("../models/pedidosBar.model").PedidosBar;
const PedidosBarProdutos =
  require("../models/pedidosBarProdutos.model").PedidosBarProdutos;
const utilities = require("../utilities/utilities");

exports.adicionarProduto = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth) {
      return res.status(401).send({
        message: "Token inválido.",
      });
    }

    if (auth.tipo !== "admin") {
      return res.status(401).send({
        message: "Não tem permissões de administrador.",
      });
    }

    // Verificar se o produto já existe
    const produto = await ProdutosBar.findOne({
      where: { Nome: req.body.Nome },
    });

    if (produto) {
      return res.status(400).send({
        message: "Produto já existe.",
      });
    }

    const categoria = await CategoriasBar.findOne({
      where: { Nome: req.body.Categoria },
    });

    if (!categoria) {
      return res.status(400).send({
        message: "Categoria não existe.",
      });
    }

    // Adicionar produto ao bar
    const novoproduto = await ProdutosBar.create({
      Nome: req.body.Nome,
      Descricao: req.body.Descricao,
      Preco: req.body.Preco,
      Stock: req.body.Stock,
      IdCategoria: categoria.idCategoriaBar,
    });

    return res.status(201).send({
      message: "Produto adicionado com sucesso.",
      produto: novoproduto,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu um erro ao adicionar o produto.",
    });
  }
};

//obter produtos do bar
exports.obterProdutos = async function (req, res) {
  // Verificar autenticação
  let auth = utilities.verifyToken(req.headers.authorization);

  if (!auth) {
    return res.status(401).send({
      message: "Não autorizado.",
    });
  }

  try {
    // Buscar as categorias do bar
    const categorias = await CategoriasBar.findAll({
      attributes: ["idCategoriaBar", "nome"],
      raw: true,
    });

    // Buscar os produtos do bar agrupados por categoria
    const produtosPorCategoria = await Promise.all(
      categorias.map(async (categoria) => {
        const produtos = await ProdutosBar.findAll({
          where: { IdCategoria: categoria.idCategoriaBar },
          attributes: ["IdProduto", "Nome", "Descricao", "Preco", "Stock"],
          raw: true,
        });

        return {
          categoria: categoria,
          produtos: produtos,
        };
      })
    );
    const existeProdutos = produtosPorCategoria.some(
      (categoria) => categoria.produtos.length > 0
    );

    if (!existeProdutos) {
      return res.status(404).json({
        message: "Nenhum produto encontrado.",
      });
    }

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

  if (!auth) {
    return res.status(401).send({
      message: "Não autorizado.",
    });
  }

  const userId = auth.id;
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

    // Se o produto já estiver no carrinho, incrementar a quantidade
    if (produtoCarrinho) {
      await CarrinhoItens.update(
        { Quantidade: produtoCarrinho.Quantidade + 1 },
        { where: { IdProduto: idProduto, IdCarrinho: userId } }
      );
    } else {
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

      // Adicionar produto ao carrinho com quantidade inicial 1
      await CarrinhoItens.create({
        IdCarrinho: userId,
        IdProduto: idProduto,
        Quantidade: 1,
      });
    }

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

//obter carrinho

exports.obterCarrinho = async function (req, res) {
  let auth = utilities.verifyToken(req.headers.authorization);

  if (!auth) {
    return res.status(401).send({
      message: "Não autorizado.",
    });
  }

  const userId = auth.id;
  try {
    const produtos = await CarrinhoItens.findAll({
      where: { IdCarrinho: userId },
      include: [
        {
          model: ProdutosBar,
          attributes: ["IdProduto", "Nome", "Descricao", "Preco", "Stock"],
          raw: true,
        },
      ],
      attributes: ["IdProduto", "Quantidade"],
      raw: true,
    });
    const existeProdutos = produtos.length > 0;
    if (!existeProdutos) {
      return res.status(404).json({
        message: "Nenhum produto encontrado.",
      });
    }
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro ao obter os produtos do carrinho.",
    });
  }
};

//ver pedido individual
exports.verPedidoIndividual = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth) {
      return res.status(401).send({
        message: "Token inválido.",
      });
    }

    const userId = auth.id;

    const pedido = await PedidosBar.findOne({
      where: { 
        IdPedido: req.params.IdPedido,
        UserId: userId
    },
      attributes: ["IdPedido", "UserId", "QRCode"],
      include: [
        {
          model: PedidosBarProdutos,
          attributes: ["IdProduto", "Quantidade"],
          include: [
            {
              model: ProdutosBar,
              attributes: ["IdProduto", "Nome", "Descricao", "Preco", "Stock"],
              raw: true,
            },
          ],
          raw: true,
        },
      ],
      raw: true,
    });

    if (!pedido) {
      return res.status(404).send({
        message: "Pedido não existe.",
      });
    }

    return res.status(200).send(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu um erro ao obter o pedido.",
    });
  }
};
