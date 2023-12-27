const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;
const { PedidosBar } = require("./pedidosBar.model");
const { ProdutosBar } = require("./produtosBar.model");

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
                model: "PedidosBars",
                key: "IdPedido",
            },
        },
        IdProduto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ProdutosBars",
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

PedidosBarProdutos.belongsTo(PedidosBar, { foreignKey: "IdPedido" });
PedidosBarProdutos.belongsTo(ProdutosBar, { foreignKey: "IdProduto" });

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela PedidosBarProdutos foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela PedidosBarProdutos não foi criada!" + error);
    });

exports.PedidosBarProdutos = PedidosBarProdutos;