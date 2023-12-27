const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;


class RefeicaoCantina extends Model {}

RefeicaoCantina.init(
    {
      IdRefeicao: {
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
      TipoPrato: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Preco: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: false,
      },
    },
    {
      sequelize: mysqlDB,
      modelName: "RefeicaoCantina",
      timestamps: false,
    }
);

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela RefeicaoCantina foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela RefeicaoCantina não foi criada!" + error);
    });

exports.RefeicaoCantina = RefeicaoCantina;