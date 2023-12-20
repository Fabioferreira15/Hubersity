const Utilizadores = require("../models/utilizadores").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const Cursos = require("../models/cursos.model").Cursos;
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
            imgPerfil: "https://res.cloudinary.com/djoiers7m/image/upload/v1703071856/ProfilePictures/pruiusl1vghf9v6jgtiw.png",
            imgCapa: "https://res.cloudinary.com/djoiers7m/image/upload/v1703072776/ImagemCapa/v4aykqwcewhws56un86g.png"
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

//rota para ver o proprio perfil 
exports.verPerfil = function (req, res) {
  const { id } = req.params.id;

  Utilizadores.findById(id, { include: ["carrinho"] })
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
};

//obter dados do parque de estacionamento
exports.obterDadosPagamento = function (req, res) {
  const { UserId } = req.params;

  // Substitua 'id_parque' pelo campo correto que identifica o parque de estacionamento no seu modelo
  Utilizadores.findOne({ where: { UserId} })
    .then((pagamentoEstacionamento) => {
      if (!pagamentoEstacionamento) {
        res.status(404).send({
          message: "Dados de pagamento não encontrados para o parque de estacionamento.",
        });
        return;
      }

      // Construa a resposta com os dados de pagamento
      const newDadosPagamento = {
        idDoPagamento: pagamentoEstacionamento.idPagamento,
        PróximoPagamento: pagamentoEstacionamento.PróximoPagamento,
        qrCode: pagamentoEstacionamento.QRCode
      };

      res.status(200).send(newDadosPagamento);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocorreu um erro ao buscar os dados de pagamento.",
      });
    });
};

