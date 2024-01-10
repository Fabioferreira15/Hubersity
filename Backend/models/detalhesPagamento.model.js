const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;
const { Utilizadores } = require("./utilizadores.model");

class DetalhesPagamento extends Model {}

DetalhesPagamento.init(
  {
    IdDetalhesPagamento: {
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
    NumeroCartao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CVV: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DataValidade: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    NomeTitular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: mysqlDB,
    modelName: "DetalhesPagamento",
    timestamps: false,
  }
);

DetalhesPagamento.belongsTo(Utilizadores, { foreignKey: "UserId" });

mysqlDB
  .sync()
  .then(() => {
    console.log("A tabela DetalhesPagamento foi criada com sucesso!");
  })
  .catch((error) => {
    console.log("A tabela DetalhesPagamento não foi criada!" + error);
  });

exports.DetalhesPagamento = DetalhesPagamento;
