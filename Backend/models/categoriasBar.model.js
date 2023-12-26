const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class CategoriasBar extends Model {}

CategoriasBar.init(
    {
        IdCategoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NomeCategoria: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize: mysqlDB,
        modelName: "CategoriasBar",
        timestamps: false,
    }
);

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela CategoriasBar foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela CategoriasBar não foi criada!" + error);
    });

exports.CategoriasBar = CategoriasBar;