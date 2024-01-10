const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;
const { Utilizadores } = require("./utilizadores.model");
const { DetalhesPagamento } = require("./detalhesPagamento.model");

class Pagamento extends Model {}

Pagamento.init(
    {
        IdPagamento: {
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
        Valor: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        Data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        IdDetalhesPagamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "DetalhesPagamentos",
                key: "IdDetalhesPagamento",
            },
        },
    },
    {
        sequelize: mysqlDB,
        modelName: "Pagamento",
        timestamps: false,
    }
);

Pagamento.belongsTo(Utilizadores, {foreignKey: 'UserId'});
Pagamento.belongsTo(DetalhesPagamento, {foreignKey: 'IdDetalhesPagamento'});


mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela Pagamento foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela Pagamento não foi criada!" + error);
    });

exports.Pagamento = Pagamento;