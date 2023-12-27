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
        attributes: ["IdRefeicao", "Nome", "TipoPrato", "Data", "Preco"],
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

//marcar refeições
exports.marcarRefeicao = async (req, res, next) => {
    try {
        let auth = utilities.verifyToken(req.headers.authorization);

        if (auth) {
            const { id } = req.params;
            
            if (auth.id != id) {
                res.status(401).send({
                    message: "Não autorizado.",
                });
                return;
            }
        
        const { IdRefeicao, UserId, Valor } = req.body;

        if(!IdRefeicao || !UserId || !Valor ) {
            res.status(400).send({
                message: "Dados em falta!",
            });
            return;
        }

        //verificar se já existe a refeição
        await MarcacaoCantina.findOne({
            where: {
                IdRefeicao: IdRefeicao,
                UserId: UserId,
            },
        });

        //criar marcação na cantina
        await MarcacaoCantina.create({
            IdRefeicao: IdRefeicao,
            UserId: UserId,
        });

        //criar pagamento
        await Pagamento.create({
            Valor: Valor,
            UserId: UserId,
        });

        res.status(200).send({
            message: "Refeição marcada com sucesso!",
            //recebe támbem o idPagamento, o valor, a dataPagamento, e o idMarcacaoRefeicao
            idPagamento: Pagamento.idPagamento,
            Valor: Pagamento.Valor,
            Data: Pagamento.Data,
            IdMarcacao: MarcacaoCantina.IdMarcacao,
        });
    }
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong",
            error: error.message
        });
    }
};

//obter marcação individual
exports.obterMarcacaoIndividual = (req, res, next) => {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (auth) {
        const { id } = req.params;

        if (auth.id != id) {
            res.status(401).send({
                message: "Não autorizado.",
            });
            return;
        }

        MarcacaoCantina.findOne({
            where: {
                IdMarcacao: id,  // Certifique-se de que IdMarcacao seja o campo correto para encontrar a marcação desejada
            },
        })
            .then((marcacao) => {
                if (!marcacao) {
                    return res.status(404).json({
                        message: "Marcação não encontrada.",
                    });
                }

                // Obtendo detalhes da refeição associada
                return RefeicaoCantina.findOne({
                    where: {
                        IdRefeicao: marcacao.IdRefeicao,  // Certifique-se de que IdRefeicao seja o campo correto
                    },
                })
                    .then((refeicao) => {
                        if (!refeicao) {
                            return res.status(404).json({
                                message: "Refeição não encontrada.",
                            });
                        }

                        // Responder com o formato desejado
                        res.status(200).json({
                            idMarcacao: marcacao.IdMarcacao,
                            UserId: marcacao.UserId,
                            idRefeicao: marcacao.IdRefeicao,
                            status: marcacao.status,
                            QRCode: marcacao.QRCode,
                            detalhesRefeicao: {
                                idRefeicao: refeicao.IdRefeicao,
                                nomeRefeicao: refeicao.Nome,
                                tipoPrato: refeicao.TipoPrato,
                                dataRefeicao: refeicao.Data,
                                precoRefeicao: refeicao.Preco,
                            },
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: "Ocorreu um erro ao obter a marcação da cantina!",
                });
            });
    } else {
        res.status(401).send({
            message: "Não autorizado.",
        });
    }
};

//obter marcações pendentes
exports.obterMarcacoesPendentes = (req, res, next) => {
    let auth = utilities.verifyToken(req.headers.authorization);

    if (auth) {
        const { id } = req.params;

        if (auth.id != id) {
            res.status(401).send({
                message: "Não autorizado.",
            });
            return;
        }

        // Encontrar marcações pendentes
        MarcacaoCantina.findAll({
            where: {
                UserId: id,
                status: "Por consumir",
            },
        })
            .then((marcacoes) => {
                if (marcacoes.length === 0) {
                    // Não existem marcações pendentes
                    res.status(204).json({
                        mensagem: "Não existem marcações pendentes",
                    });
                    return;
                }

                // Mapear as marcações para o formato desejado
                const marcacoesFormatadas = marcacoes.map((marcacao) => {
                    return {
                        idMarcacao: marcacao.IdMarcacao,
                        UserId: marcacao.UserId,
                        idRefeicao: marcacao.IdRefeicao,
                        status: marcacao.status,
                        QRCode: marcacao.QRCode,
                        detalhesRefeicao: {
                            idRefeicao: marcacao.idRefeicao,
                            nomeRefeicao: marcacao.nomeRefeicao,
                            tipoPrato: marcacao.tipoPrato,
                            dataRefeicao: marcacao.dataRefeicao,
                            precoRefeicao: marcacao.precoRefeicao,
                        },
                    };
                });

                // Responder com as marcações formatadas
                res.status(200).json(marcacoesFormatadas);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: "Ocorreu um erro ao obter as marcações pendentes!",
                });
            });
    } else {
        res.status(401).send({
            message: "Não autorizado.",
        });
    }
};

    