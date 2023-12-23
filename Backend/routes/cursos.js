const express = require("express");
const router = express.Router();
const cursosController = require("../controllers/cursos");
const { body, validationResult } = require("express-validator");

router.get("/", function (req, res) {
  cursosController.findAll(req, res);
});

module.exports = router;
