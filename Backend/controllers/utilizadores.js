const Utilizadores = require("../models/utilizadores.model").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const Cursos = require("../models/cursos.model").Cursos;
const PagamentoEstacionamento =
  require("../models/pagamentoEstacionamento.model").PagamentoEstacionamento;
const Pagamento = require("../models/pagamento.model").Pagamento;
const QRCode = require("qrcode");
const DetalhesPagamento =
  require("../models/detalhesPagamento.model").DetalhesPagamento;
const Marcacoes = require("../models/marcacaoCantina.model").MarcacaoCantina;
const Pedidos = require("../models/pedidosBar.model").PedidosBar;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const utilities = require("../utilities/utilities");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.C_CLOUD_NAME,
  api_key: process.env.C_API_KEY,
  api_secret: process.env.C_API_SECRET,
});

exports.register = function (req, res) {
  const { nome, email, password, confirmarPassword, nomeCurso } = req.body;

  if (password !== confirmarPassword) {
    res.status(400).send({
      message: "As senhas não coincidem!",
    });
    return;
  }

  Utilizadores.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "E-mail já registado. Escolha outro e-mail.",
        });
        return;
      }

      Cursos.findOne({ where: { nomeCurso: nomeCurso } })
        .then((curso) => {
          if (!curso) {
            res.status(404).send({
              message: "Curso não encontrado.",
            });
            return;
          }

          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);

          Utilizadores.create({
            nome: nome,
            email: email,
            password: hash,
            idCurso: curso.idCurso,
            imgPerfil:
              "https://res.cloudinary.com/djoiers7m/image/upload/v1703071856/ProfilePictures/pruiusl1vghf9v6jgtiw.png",
            imgCapa:
              "https://res.cloudinary.com/djoiers7m/image/upload/v1703072776/ImagemCapa/v4aykqwcewhws56un86g.png",
          })
            .then((user) => {
              Carrinho.create({
                UserId: user.UserId,
              })
                .then(() => {
                  res.send({
                    message: "Utilizador registado com sucesso!",
                  });
                })
                .catch((error) => {
                  res.status(500).send({
                    message:
                      error.message || "Ocorreu um erro ao criar o carrinho.",
                  });
                });
            })
            .catch((error) => {
              res.status(500).send({
                message:
                  error.message || "Ocorreu um erro ao criar o utilizador.",
              });
            });
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || "Ocorreu um erro ao buscar o curso.",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocorreu um erro ao verificar o e-mail.",
      });
    });
};

exports.login = function (req, res) {
  const { email, password } = req.body;

  Utilizadores.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "Utilizador não encontrado!",
        });
        return;
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          utilities.generateToken(user, function (token) {
            res.send({
              mensagem: "Login efetuado com sucesso!",
              token: token,
              UserInfo: {
                UserId: user.UserId,
                nome: user.nome,
                imgPerfil: user.imgPerfil,
                tipo: user.tipo_utilizador,
              },
            });
          });
        } else {
          res.status(400).send({
            message: "Senha incorreta!",
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocorreu um erro ao fazer login.",
      });
    });
};

exports.verPerfil = function (req, res) {
  let auth = utilities.verifyToken(req.headers.authorization);

  if (auth) {
    const { id } = req.params;

    if (auth.id != id) {
      res.status(401).send({
        message: "Não autorizado.",
      });
      return;
    }

    const userId = parseInt(id);

    Utilizadores.findByPk(userId)
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: "Utilizador não encontrado.",
          });
          return;
        }

        res.send(user);
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Ocorreu um erro ao buscar o utilizador.",
        });
      });
  } else {
    res.status(401).send({
      message: "Não autorizado.",
    });
  }
};

//obterPagamentoEstacionamento do utilizador

exports.obterPagamentoEstacionamento = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);

    const estacionamento = await PagamentoEstacionamento.findOne({
      where: { UserId: userId },
    });

    if (estacionamento) {
      res.status(200).send({
        message: "Estacionamento encontrado!",
        estacionamento: estacionamento,
      });
    } else {
      res.status(200).send({
        message: "Ainda não efetuou o pagamento do estacionamento!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocorreu um erro ao buscar o pagamento de estacionamento.",
    });
  }
};

//Pagar estacionamento
exports.pagarEstacionamento = async (req, res) => {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);

    const utilizador = await Utilizadores.findByPk(userId);

    if (!utilizador) {
      res.status(404).send({
        message: "Utilizador não encontrado.",
      });
    }

    const estacionamentoExistente = await PagamentoEstacionamento.findOne({
      where: { UserId: userId },
    });

    if (estacionamentoExistente) {
      res.status(400).send({
        message: `Já efetuou o pagamento do estacionamento! Proximo pagamento: ${estacionamentoExistente.ProximoPagamento}`,
      });
    }

    const detalhesPagamentoExistente = await DetalhesPagamento.findOne({
      where: {
        UserId: userId,
      },
    });

    let detalhesPagamento;

    if (!detalhesPagamentoExistente) {
      detalhesPagamento = await DetalhesPagamento.create({
        UserId: userId,
        NumeroCartao: req.body.NumeroCartao,
        CVV: req.body.CVV,
        DataValidade: req.body.DataValidade,
        NomeTitular: req.body.NomeTitular,
      });
    } else {
      detalhesPagamento = detalhesPagamentoExistente;
    }

    const pagamento = await Pagamento.create({
      UserId: userId,
      Valor: 5,
      IdDetalhesPagamento: detalhesPagamento.IdDetalhesPagamento,
      Data: new Date(),
    });

    const proximoPagamento = new Date(pagamento.Data);
    proximoPagamento.setMonth(proximoPagamento.getMonth() + 1);

    const qrData = {
      Utilizador: utilizador.nome,
      status: "Pago",
      ProximoPagamento: proximoPagamento,
    };

    utilities.generateQrToken(qrData, async (token) => {
      qrData.token = token;

      const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

      const estacionamento = await PagamentoEstacionamento.create({
        UserId: userId,
        ProximoPagamento: proximoPagamento,
        QRCode: qrCode,
        IdPagamento: pagamento.IdPagamento,
      });

      res.status(200).send({
        message: "Pagamento efetuado com sucesso!",
        pagamento: pagamento,
        estacionamento: estacionamento,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao pagar o estacionamento.",
    });
  }
};

//editar perfil
exports.editarPerfil = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);

    const user = await Utilizadores.findByPk(userId);

    if (!user) {
      res.status(404).send({
        message: "Utilizador não encontrado.",
      });
      return;
    }

    const { nome, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const updatedUser = await user.update({
      nome: nome,
      password: hash,
    });

    res.status(200).send({
      message: "Perfil editado com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao editar o perfil.",
    });
  }
};

//admin

//obter todos os utilizadores
exports.obterUtilizadores = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.tipo != "admin") {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const utilizadores = await Utilizadores.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).send({
      message: "Utilizadores encontrados!",
      utilizadores: utilizadores,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao buscar os utilizadores.",
    });
  }
};

//apagar utilizador
exports.apagarUtilizador = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.tipo != "admin") {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);

    const utilizador = await Utilizadores.findByPk(userId);

    if (!utilizador) {
      res.status(404).send({
        message: "Utilizador não encontrado.",
      });
      return;
    }

    const pagamentoEstacionamento = await PagamentoEstacionamento.findOne({
      where: { UserId: userId },
    });

    if (pagamentoEstacionamento) {
      await pagamentoEstacionamento.destroy();
    }

    const carrinho = await Carrinho.findOne({
      where: { UserId: userId },
    });

    if (carrinho) {
      await carrinho.destroy();
    }

    const pagamentos = await Pagamento.findAll({
      where: { UserId: userId },
    });

    if (pagamentos) {
      for (const pagamento of pagamentos) {
        const detalhesPagamento = await DetalhesPagamento.findByPk(
          pagamento.IdDetalhesPagamento
        );

        if (detalhesPagamento) {
          await detalhesPagamento.destroy();
        }

        await pagamento.destroy();
      }
    }

    const marcacoes = await Marcacoes.findAll({
      where: { UserId: userId },
    });

    if (marcacoes) {
      for (const marcacao of marcacoes) {
        await marcacao.destroy();
      }
    }

    const pedidos = await Pedidos.findAll({
      where: { UserId: userId },
    });

    if (pedidos) {
      for (const pedido of pedidos) {
        await pedido.destroy();
      }
    }

    await utilizador.destroy();

    res.status(200).send({
      message: "Utilizador apagado com sucesso!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao apagar o utilizador.",
    });
  }
};

//adicionar detalhes pagamento
exports.adicionarDetalhesPagamento = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);
    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado",
      });
    }
    const userId = parseInt(req.params.id);

    const detalhesPagamentoExistente = await DetalhesPagamento.findOne({
      where: { UserId: userId, Excluido: false },
    });

    if (detalhesPagamentoExistente) {
      return res.status(400).send({
        message: "Já tem um cartão associado",
      });
    }

    const numeroCartao = req.body.NumeroCartao;
    const CVV = req.body.CVV;
    const DataValidade = req.body.DataValidade;
    const NomeTitular = req.body.NomeTitular;

    if (!numeroCartao || !CVV || !DataValidade || !NomeTitular) {
      return res.status(400).send({
        message: "Dados em falta",
      });
    }

    const novoDetalhesPagamento = await DetalhesPagamento.create({
      UserId: userId,
      NumeroCartao: numeroCartao,
      CVV: CVV,
      DataValidade: DataValidade,
      NomeTitular: NomeTitular,
    });

    return res.status(201).send({
      message: "Cartão adicionado com sucesso",
    });
  } catch (error) {
    console.error("Error adding payment details:", error);
    return res.status(500).send({
      message: "Ocorreu um erro ao adicionar detalhes de pagamento",
    });
  }
};

//obter detalhes pagamento
exports.obterDetalhesPagamento = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);

    const utilizador = await Utilizadores.findByPk(userId);
    if (!utilizador) {
      res.status(404).send({
        message: "Utilizador não encontrado.",
      });
      return;
    }

    const detalhesPagamentoExistente = await DetalhesPagamento.findOne({
      where: { UserId: userId,Excluido: false },
    });

    if (!detalhesPagamentoExistente) {
      res.status(404).send({
        message: "Ainda não tem nenhum cartão associado",
      });
    } else {
      res.status(200).send({
        message: "Cartão encontrado",
        data: detalhesPagamentoExistente,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocorreu um erro ao apagar o utilizador.",
    });
  }
};

//apagar detalhes pagamento
exports.apagarDetalhesPagamento = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);
    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado",
      });
    }
    const userId = parseInt(req.params.id);

    const detalhesPagamentoExistente = await DetalhesPagamento.findOne({
      where: { UserId: userId, Excluido: false },
    });

    if (!detalhesPagamentoExistente) {
      return res.status(404).send({
        message: "Não tem nenhum cartão associado",
      });
    }

    await detalhesPagamentoExistente.update({
      Excluido: true,
    });

    return res.status(200).send({
      message: "Cartão apagado com sucesso",
    });
  } catch (error) {
    console.error("Error deleting payment details:", error);
    return res.status(500).send({
      message: "Ocorreu um erro ao apagar detalhes de pagamento",
    });
  }
};
