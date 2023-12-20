const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class Utilizadores extends Model {}

Utilizadores.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pontos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imgPerfil: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imgCapa: { 
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tipo_utilizador: {
      type: DataTypes.ENUM("admin", "professor", "aluno"),
      defaultValue: "aluno",
    },
    idCurso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Cursos",
        key: "idCurso",
      },
    },

  },
  {
    sequelize: mysqlDB,
    modelName: "Utilizadores",
    timestamps: false,
  }
);

mysqlDB
  .sync()
  .then(() => {
    console.log("A tabela Utilizadores foi criada com sucesso!");
  })
  .catch((error) => {
    console.log("A tabela Utilizadores não foi criada!" + error);
  });
exports.Utilizadores = Utilizadores;
