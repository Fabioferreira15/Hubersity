const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class MarcacaoCantina extends Model {}

MarcacaoCantina.init(
  {
    IdMarcacao: {
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
    IdRefeicao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "RefeicaoCantina",
            key: "IdRefeicao",
        },
    },
    status: {
        type: DataTypes.ENUM("Por Consumir", "Consumida"),
        defaultValue: "pendente",
    },
    IdPagamento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Pagamento",
            key: "IdPagamento",
        },
    },
    QRCode: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
  },
  {
    sequelize: mysqlDB,
    modelName: "MarcacaoCantina",
    timestamps: false,
  }
);

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela MarcacaoCantina foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela MarcacaoCantina não foi criada!" + error);
    });

exports.MarcacaoCantina = MarcacaoCantina;
