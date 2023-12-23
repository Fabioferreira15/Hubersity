const Cursos = require("../models/cursos.model").Cursos;

// GET /cursos
exports.findAll = (req, res) => {
  Cursos.findAll()
    .then((cursos) => {
      res.send(cursos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao obter os cursos.",
      });
    });
};
