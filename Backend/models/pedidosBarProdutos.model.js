const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class PedidosBarProdutos extends Model {}

PedidosBarProdutos.init(
    {
        IdPedidoProduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        IdPedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "PedidosBar",
                key: "IdPedido",
            },
        },
        IdProduto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ProdutosBar",
                key: "IdProduto",
            },
        },
        Quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: mysqlDB,
        modelName: "PedidosBarProdutos",
        timestamps: false,
    }
);

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela PedidosBarProdutos foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela PedidosBarProdutos não foi criada!" + error);
    });

exports.PedidosBarProdutos = PedidosBarProdutos;