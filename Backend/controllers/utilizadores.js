const Utilizadores = require("../models/utilizadores.model").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const Cursos = require("../models/cursos.model").Cursos;
const categoriasBar = require("../models/categoriasBar.model").CategoriasBar;
const ProdutosBar = require("../models/produtosBar.model").ProdutosBar;
const CarrinhoItens = require("../models/carrinhoItens.model").CarrinhoItens;
const PedidosBar = require("../models/pedidosBar.model").PedidosBar;
const PedidosBarProdutos = require("../models/pedidosBarProdutos.model");
const MarcacaoCantina =
  require("../models/marcacaoCantina.model").MarcacaoCantina;
const PagamentoEstacionamento =
  require("../models/pagamentoEstacionamento.model").PagamentoEstacionamento;
const Pagamento = require("../models/pagamento.model").Pagamento;
const bcrypt = require("bcrypt");
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
      res.status(404).send({
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
exports.pagarEstacionamento = async function (req, res) {
  try {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (!auth || auth.id != req.params.id) {
      return res.status(401).send({
        message: "Não autorizado.",
      });
    }

    const userId = parseInt(req.params.id);

    const estacionamentoExistente = await PagamentoEstacionamento.findOne({
      where: { UserId: userId },
    });

    if (estacionamentoExistente) {
      res.status(400).send({
        message: "Já efetuou o pagamento do estacionamento!",
      });
    }

    const pagamento = await Pagamento.create({
      UserId: userId,
      Valor: 5,
      Data: new Date(),
      MetodoPagamento: "MBWay",
    });

    if (pagamento) {
      const estacionamento = await PagamentoEstacionamento.create({
        UserId: userId,
        ProximoPagamento: new Date().setDate(new Date().getDate() + 30),
        QRCode: "teste",
        IdPagamento: pagamento.IdPagamento,
      });

      res.status(200).send({
        message: "Pagamento efetuado com sucesso!",
        pagamento: pagamento,
        estacionamento: estacionamento,
      });
    }
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
