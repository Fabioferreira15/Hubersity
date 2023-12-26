const Utilizadores = require("../models/utilizadores").Utilizadores;
const Carrinho = require("../models/carrinho.model").Carrinho;
const RefeicaoCantina = require("../models/refeicaoCantina.model").RefeicaoCantina;
const MarcacaoCantina = require("../models/marcacaoCantina.model").MarcacaoCantina;
const Pagamento = require("../models/pagamento.model").Pagamento;
const utilities = require("../utilities/utilities");

//obter as refeições da cantina
exports.obterRefeicoesCantina = (req, res, next) => {

let auth = utilities.verifyToken(req.headers.authorization);

if (auth) {
    const { id } = req.params;
    
    if (auth.id != id) {
        res.status(401).send({
            message: "Não autorizado.",
        });
        return;
    }

    RefeicaoCantina.findAll({
        attributes: ["IdRefeicao", "Nome", "Descricao", "TipoPrato", "Data", "Preco"],
    })
        .then((refeicoes) => {
            res.status(200).json(refeicoes);
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