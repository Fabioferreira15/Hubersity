const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class CarrinhoItens extends Model {}

CarrinhoItens.init(
    {
        IdCarrinhoItem: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        IdCarrinho: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Carrinho",
                key: "IdCarrinho",
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
        modelName: "CarrinhoItens",
        timestamps: false,
    }
);

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela CarrinhoItens foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela CarrinhoItens não foi criada!" + error);
    });

exports.CarrinhoItens = CarrinhoItens;