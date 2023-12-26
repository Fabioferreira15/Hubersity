const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class Pagamento extends Model {}

Pagamento.init(
    {
        IdPagamento: {
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
        Valor: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        Data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        MetodoPagamento: {
            type: DataTypes.ENUM("MBWay", "CartaoDébito"),
            allowNull: false,
        },
    },
    {
        sequelize: mysqlDB,
        modelName: "Pagamento",
        timestamps: false,
    }
);