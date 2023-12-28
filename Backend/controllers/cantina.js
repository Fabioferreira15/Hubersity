const Utilizadores = require("../models/utilizadores.model").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const RefeicaoCantina =
  require("../models/refeicaoCantina.model").RefeicaoCantina;
const MarcacaoCantina =
  require("../models/marcacaoCantina.model").MarcacaoCantina;
const Pagamento = require("../models/pagamento.model").Pagamento;
const utilities = require("../utilities/utilities");

//criar refeições na cantina
exports.criarRefeicaoCantina = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.tipo !== "admin") {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const { Nome, Descricao, TipoPrato, Data, Preco } = req.body;

    if (!Nome || !Descricao || !TipoPrato || !Data || !Preco) {
      return res.status(400).send({
        message: "Dados em falta!",
      });
    }

    const refeicaoExistente = await RefeicaoCantina.findOne({
      where: {
        TipoPrato: TipoPrato,
        Data: Data,
      },
    });

    if (refeicaoExistente) {
      return res.status(400).send({
        message: `Já existe uma refeição do tipo ${TipoPrato} para a data ${Data}.`,
      });
    }

    await RefeicaoCantina.create({
      Nome: Nome,
      Descricao: Descricao,
      TipoPrato: TipoPrato,
      Data: Data,
      Preco: Preco,
    });

    res.status(200).send({
      message: "Refeição criada com sucesso!",
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocorreu um erro ao criar a refeição na cantina.",
    });
  }
};

//obter as refeições da cantina
exports.obterRefeicoesCantina = (req, res, next) => {
  let auth = utilities.verifyToken(req.headers.authorization);

  if (auth) {
    const { data } = req.query; // Obtém a data da query

    // Cria um objeto de condição para a consulta
    const condition = {
      attributes: ["IdRefeicao", "Nome", "TipoPrato", "Data", "Preco"],
    };

    // Adiciona a condição de data se fornecida na query
    if (data) {
      condition.where = {
        Data: new Date(data),
      };
    }

    RefeicaoCantina.findAll(condition)
      .then((refeicoes) => {
        if (refeicoes.length === 0) {
          res.status(200).send({
            message: "Não há refeições disponíveis na cantina.",
          });
        } else {
          res.status(200).send({
            message: "Refeições encontradas!",
            refeicoes: refeicoes,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Ocorreu um erro ao obter as refeições da cantina!",
        });
      });
  } else {
    res.status(401).send({
      message: "Não autorizado.",
    });
  }
};

// marcar refeições

exports.pagamentoMarcacao = async (req, res) => {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);
    const { IdRefeicao, Valor } = req.body;

    if (!IdRefeicao || !Valor) {
      return res.status(400).send({
        message: "Dados em falta!",
      });
    }

    //verificar se já existe a refeição
    const refeicaoExistente = await RefeicaoCantina.findOne({
      where: {
        IdRefeicao: IdRefeicao,
      },
    });

    if (!refeicaoExistente) {
      return res.status(400).send({
        message: "Refeição não existe!",
      });
    }

    const marcacaoExistente = await MarcacaoCantina.findOne({
      where: {
        IdRefeicao: IdRefeicao,
        UserId: userId,
      },
    });

    if (marcacaoExistente) {
      return res.status(400).send({
        message: "Já tem uma marcação para esta refeição!",
      });
    }

    //criar pagamento
    const pagamento = await Pagamento.create({
      UserId: userId,
      Valor: Valor,
      MetodoPagamento: "MBWay",
      Data: new Date(),
    });

    //criar marcacao
    const marcacao = await MarcacaoCantina.create({
      IdRefeicao: IdRefeicao,
      UserId: userId,
      IdPagamento: pagamento.IdPagamento,
      status: "Pendente",
      QRCode: "QRCode",
      Data: refeicaoExistente.Data,
    });
    res.status(200).send({
      message: "Pagamento efetuado com sucesso!",
      pagamento: pagamento,
      marcacao: marcacao,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao pagar o estacionamento.",
    });
  }
};

//obter marcação individual
exports.obterMarcacaoIndividual = async (req, res) => {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.Userid) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.Userid);
    const idMarcacao = parseInt(req.params.idMarcacao);

    // Aguardar a resolução da Promessa
    const marcacaoExistente = await MarcacaoCantina.findOne({
      where: {
        UserId: userId,
        IdMarcacao: idMarcacao,
      },
    });

    if (!marcacaoExistente) {
      return res.status(400).send({
        message: "Marcação não existe!",
      });
    }

    //obter refecição
    const refeicao = await RefeicaoCantina.findOne({
      where: {
        IdRefeicao: marcacaoExistente.IdRefeicao,
      },
    });

    console.log(refeicao);

    res.status(200).json({
      idMarcacao: marcacaoExistente.IdMarcacao,
      UserId: marcacaoExistente.UserId,
      idRefeicao: marcacaoExistente.IdRefeicao,
      status: marcacaoExistente.status,
      QRCode: marcacaoExistente.QRCode,
      detalhesRefeicao: {
        nomeRefeicao: refeicao.Nome,
        tipoPrato: refeicao.TipoPrato,
        dataRefeicao: refeicao.Data,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao obter a marcação.",
    });
  }
};

//obter marcações pendentes
exports.obterMarcacoesPendentes = async (req, res) => {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    const userId = parseInt(req.params.id);

    const marcacoes = await MarcacaoCantina.findAll({
      where: {
        UserId: userId,
        status: "Pendente",
      },
    });

    if (!marcacoes) {
      return res.status(400).send({
        message: "Não tem marcações pendentes!",
      });
    }

    res.status(200).send({
      message: "Marcações pendentes encontradas!",
      marcacoes: marcacoes,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocorreu um erro ao obter as marcações pendentes.",
    });
  }
};
