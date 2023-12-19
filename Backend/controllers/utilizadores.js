const Utilizadores = require("../models/utilizadores").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const Cursos = require("../models/cursos.model").Cursos;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utilities = require("../utilities/utilities");

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
  const { id } = req.params;

  Utilizadores.findByPk(id, { include: ["carrinho"] })
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

