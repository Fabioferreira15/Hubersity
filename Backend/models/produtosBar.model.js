const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class ProdutosBar extends Model {}

ProdutosBar.init(
    {
        IdProduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Descricao: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Preco: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        IdCategoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "CategoriasBar",
                key: "IdCategoria",
            },
        },
    },
    {
        sequelize: mysqlDB,
        modelName: "ProdutosBar",
        timestamps: false,
    }
);

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela ProdutosBar foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela ProdutosBar não foi criada!" + error);
    });

exports.ProdutosBar = ProdutosBar;