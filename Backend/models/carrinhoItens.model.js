const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;
const { Carrinho } = require("./carrinho.model");
const { ProdutosBar } = require("./produtosBar.model");

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
                model: "Carrinhos",
                key: "IdCarrinho",
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize: mysqlDB,
        modelName: "CarrinhoItens",
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
CarrinhoItens.belongsTo(Carrinho, { foreignKey: "IdCarrinho" });
CarrinhoItens.belongsTo(ProdutosBar, { foreignKey: "IdProduto" });

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela CarrinhoItens foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela CarrinhoItens não foi criada!" + error);
    });

exports.CarrinhoItens = CarrinhoItens;