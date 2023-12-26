const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class PedidosBar extends Model {}

PedidosBar.init(
    {
        IdPedido: {
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
        Data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Status: {
            type: DataTypes.ENUM("pendente", "aceite", "recusado"),
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
        }
    },
    {
        sequelize: mysqlDB,
        modelName: "PedidosBar",
        timestamps: false,
    }
);

mysqlDB
    .sync()
    .then(() => {
        console.log("A tabela PedidosBar foi criada com sucesso!");
    })
    .catch((error) => {
        console.log("A tabela PedidosBar não foi criada!" + error);
    });

exports.PedidosBar = PedidosBar;