const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;
const { Utilizadores } = require("./utilizadores.model");


class Carrinho extends Model {}

Carrinho.init(
  {
    IdCarrinho: {
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
  },
  {
    sequelize: mysqlDB,
    modelName: "Carrinho",
    timestamps: false,
  }
);

Carrinho.belongsTo(Utilizadores, { foreignKey: "UserId" });

mysqlDB
  .sync()
  .then(() => {
    console.log("A tabela Carrinho foi criada com sucesso!");
  })
  .catch((error) => {
    console.log("A tabela Carrinho não foi criada!" + error);
  });

exports.Carrinho = Carrinho;
