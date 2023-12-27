const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;
const { Utilizadores } = require("./utilizadores.model");
const { Pagamento } = require("./pagamento.model");

class PagamentoEstacionamento extends Model {}

PagamentoEstacionamento.init(
    {
        IdPagamentoEstacionamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Utilizadores",
                key: "UserId",
            },
        },
        DataPagamento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ProximoPagamento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Estado: {
            type: DataTypes.ENUM("pendente", "aceite", "recusada"),
            defaultValue: "pendente",
        },
        IdPagamento: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Pagamentos",
                key: "IdPagamento",
            },
        },
        QRCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize: mysqlDB,
        modelName: "PagamentoEstacionamento",
        timestamps: false,
    }
);

PagamentoEstacionamento.belongsTo(Utilizadores, {foreignKey: 'UserId'});
PagamentoEstacionamento.belongsTo(Pagamento, {foreignKey: 'IdPagamento'});

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela PagamentoEstacionamento foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela PagamentoEstacionamento não foi criada!" + error);
    });

exports.PagamentoEstacionamento = PagamentoEstacionamento;
//não esta a criar a tabela
