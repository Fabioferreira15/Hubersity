const Utilizadores = require("../models/utilizadores.model").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const Cursos = require("../models/cursos.model").Cursos;
const categoriasBar = require("../models/categoriasBar.model").CategoriasBar;
const ProdutosBar = require("../models/produtosBar.model").ProdutosBar;
const CarrinhoItens = require("../models/carrinhoItens.model").CarrinhoItens;
const PedidosBar = require("../models/pedidosBar.model").PedidosBar;
const PedidosBarProdutos = require("../models/pedidosBarProdutos.model")
const MarcacaoCantina = require("../models/marcacaoCantina.model").MarcacaoCantina;
const PagamentoEstacionamento = require("../models/pagamentoEstacionamento.model").PagamentoEstacionamento;
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
  //verificar se o token é válido
  let auth = utilities.verifyToken(req.headers.authorization);

  if (auth) {
    const { id } = req.params;

    //verificar se o id do token é igual ao id do utilizador
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

//obter os dados do pagamento do parque de estacionamento
exports.obterDadosPagamentoEstacionamento = function (req, res) {
  //verificar se o token é válido
  let auth = utilities.verifyToken(req.headers.authorization);

  if (auth) {
    const { id } = req.params;

    //verificar se o id do token é igual ao id do utilizador
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

        res.send({
          idPagamento: user.idPagamentoEstacionamento,
          proximoPagamento: user.PróximoPagamento,
          qrCode: user.QRCode
        });
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

//editar perfil
exports.editarPerfil = function (req, res) {
  //verificar se o token é válido
  let auth = utilities.verifyToken(req.headers.authorization);

  if (auth) {
    const { id } = req.params;

    //verificar se o id do token é igual ao id do utilizador
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

        const { imgPerfil, imgCapa, password } = req.body;
        Utilizadores.update(
          {
            imagemPerfil: imgPerfil,
            imagemCapa: imgCapa,
            //password com o hash
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          },
          { where: { UserId: userId } }
        )
          .then(() => {
            res.send({
              message: "Perfil editado com sucesso!",
            });
          })
          .catch((error) => {
            res.status(500).send({
              message:
                error.message || "Ocorreu um erro ao editar o perfil.",
            });
          });
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Ocorreu um erro ao buscar o utilizador.",
        });
      });
  }
};