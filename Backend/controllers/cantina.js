const Utilizadores = require("../models/utilizadores.model").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const RefeicaoCantina =
  require("../models/refeicaoCantina.model").RefeicaoCantina;
const MarcacaoCantina =
  require("../models/marcacaoCantina.model").MarcacaoCantina;
const Pagamento = require("../models/pagamento.model").Pagamento;
const utilities = require("../utilities/utilities");
const QrCode = require("qrcode");
const DetalhesPagamento =
  require("../models/detalhesPagamento.model").DetalhesPagamento;

const { Op } = require("sequelize");
const cron = require("node-cron");

//criar refeições na cantina
exports.criarRefeicaoCantina = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.tipo !== "admin") {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const { Nome, Descricao, TipoPrato, Data, Preco, Periodo } = req.body;

    if (!Nome || !Descricao || !TipoPrato || !Data || !Preco || !Periodo) {
      return res.status(400).send({
        message: "Dados em falta!",
      });
    }

    const refeicaoExistente = await RefeicaoCantina.findOne({
      where: {
        TipoPrato: TipoPrato,
        Data: Data,
        Periodo: Periodo,
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
      Periodo: Periodo,
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
    const { data } = req.query;

    const condition = {
      attributes: [
        "IdRefeicao",
        "Nome",
        "TipoPrato",
        "Data",
        "Preco",
        "Periodo",
      ],
    };

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

//verificar marcaçoes se já passaram da data e alterar o status para expirada usando o cron nao precisa auth
exports.verificarMarcacoes = async () => {
  try {
    const currentDate = new Date();

    const marcacoes = await MarcacaoCantina.findAll({
      where: {
        status: "Pendente",
        Data: {
          [Op.lt]: currentDate,
        },
      },
    });

    if (!marcacoes || marcacoes.length === 0) {
      console.log("Não existem marcações pendentes expiradas!");
      return;
    }

    const updatePromises = marcacoes.map(marcacao => {
      if (marcacao && marcacao.status) {
        // Adicionando verificação para evitar erro
        return MarcacaoCantina.update(
          {
            status: "Expirada",
          },
          {
            where: {
              IdMarcacao: marcacao.IdMarcacao,
            },
          }
        );
      }
    });

    await Promise.all(updatePromises);

    console.log("Marcações expiradas verificadas!");
  } catch (error) {
    console.error(
      "Ocorreu um erro ao verificar as marcações expiradas.",
      error
    );
  }
};

cron.schedule("* * * * *", async () => {
  try {
    // Call your function here
    await exports.verificarMarcacoes(); 
    console.log("Cron job executed: verificarMarcacoes");
  } catch (error) {
    console.error("Error in cron job: verificarMarcacoes", error);
  }
});

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

    // procurar utilizador
    const utilizador = await Utilizadores.findOne({
      where: {
        UserId: userId,
      },
    });

    const { IdRefeicao } = req.body;

    if (!IdRefeicao) {
      return res.status(400).send({
        message: "Dados em falta!",
      });
    }

    // verificar se existe a refeição
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
    const currentDate = new Date();
    const refeicaoDate = new Date(refeicaoExistente.Data);
    refeicaoDate.setHours(0, 0, 0, 0);

    if (refeicaoDate < currentDate) {
      return res.status(400).send({
        message: "Não pode marcar uma refeição passada!",
      });
    }

    // verificar se existe detalhes de pagamento
    const detalhesPagamentoExistente = await DetalhesPagamento.findOne({
      where: {
        UserId: userId,
        Excluido: false,
      },
    });

    if (!detalhesPagamentoExistente) {
      return res.status(400).send({
        message: "Não tem nenhum cartão associado",
      });
    }

    // criar pagamento
    const pagamento = await Pagamento.create({
      UserId: userId,
      Valor: refeicaoExistente.Preco,
      IdDetalhesPagamento: detalhesPagamentoExistente.IdDetalhesPagamento,
      Data: new Date(),
    });

    // gerar qrcode
    const qrData = {
      Utilizador: utilizador.nome,
      status: "Pendente",
      Refeição: refeicaoExistente.TipoPrato,
      Prato: refeicaoExistente.Nome,
      data: refeicaoExistente.Data,
    };

    utilities.generateQrToken(qrData, async (token) => {
      qrData.token = token;

      const qrCode = await QrCode.toDataURL(JSON.stringify(qrData));

      // criar marcacao
      const marcacao = await MarcacaoCantina.create({
        IdRefeicao: IdRefeicao,
        UserId: userId,
        IdPagamento: pagamento.IdPagamento,
        status: "Pendente",
        QRCode: qrCode,
        Data: refeicaoExistente.Data,
      });

      res.status(200).send({
        message: "Pagamento efetuado com sucesso!",
        pagamento: pagamento,
        marcacao: marcacao,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao pagar.",
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

    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);

    const marcacoes = await MarcacaoCantina.findAll({
      where: {
        UserId: userId,
        status: "Pendente",
      },
      include: [
        {
          model: RefeicaoCantina,
          attributes: ["IdRefeicao", "Nome", "TipoPrato", "Data", "Periodo"],
        },
      ],
    });

    if (!marcacoes || marcacoes.length === 0) {
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

//obter todas as marcações da cantina, histórico
exports.obterMarcacoesCantinaHistorico = async (req, res) => {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = auth.id;
    const numeroRegistos = req.query.numeroRegistos || 10;
    const dataDe = req.query.dataDe;
    const dataAte = req.query.dataAte;

    const filtroData = {};
    if (dataDe) {
      filtroData.Data = {
        [Op.gte]: dataDe,
      };
    }

    if (dataAte) {
      filtroData.Data = {
        ...filtroData.Data,
        [Op.lte]: dataAte,
      };
    }

    const marcacoes = await MarcacaoCantina.findAll({
      where: {
        UserId: userId,
        ...filtroData,
      },
      attributes: ["IdMarcacao", "Status", "QRCode"],
      include: [
        {
          model: RefeicaoCantina,
          attributes: ["IdRefeicao", "Nome", "TipoPrato", "Data", "Periodo"],
        },
        {
          model: Utilizadores,
          attributes: ["UserId", "nome", "email"],
        },
      ],
      limit: Number(numeroRegistos),
    });

    if (!marcacoes || marcacoes.length === 0) {
      return res.status(400).send({
        message: "Não existem marcações!",
      });
    }

    res.status(200).send({
      message: "Marcações encontradas!",
      marcacoes: marcacoes,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao obter as marcações.",
    });
  }
};
