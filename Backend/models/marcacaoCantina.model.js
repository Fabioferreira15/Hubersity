const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;
const { Utilizadores } = require("./utilizadores.model");
const { RefeicaoCantina } = require("./refeicaoCantina.model");
const { Pagamento } = require("./pagamento.model");


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
            model: "RefeicaoCantinas",
            key: "IdRefeicao",
        },
    },
    status: {
        type: DataTypes.ENUM("Por Consumir", "Consumida","Pendente"),
        defaultValue: "Pendente",
    },
    IdPagamento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Pagamentos",
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
MarcacaoCantina.belongsTo(Utilizadores, {foreignKey: 'UserId'});
MarcacaoCantina.belongsTo(RefeicaoCantina, {foreignKey: 'IdRefeicao'});
MarcacaoCantina.belongsTo(Pagamento, {foreignKey: 'IdPagamento'});

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela MarcacaoCantina foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela MarcacaoCantina não foi criada!" + error);
    });

exports.MarcacaoCantina = MarcacaoCantina;
