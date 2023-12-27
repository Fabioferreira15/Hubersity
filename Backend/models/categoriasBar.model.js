const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class CategoriasBar extends Model {}

CategoriasBar.init(
  {
    idCategoriaBar: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
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
    console.log("A tabela CategoriasBar foi criada com sucesso.");
  })
  .catch((error) => {
    console.log("Ocorreu um erro ao criar a tabela CategoriasBar: " + error);
  });

exports.CategoriasBar = CategoriasBar;

//não esta a criar a tabela