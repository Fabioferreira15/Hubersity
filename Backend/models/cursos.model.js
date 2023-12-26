const { Model, DataTypes } = require("sequelize");
const mysqlDB = require("../connections/mysql").sequelize;

class Cursos extends Model {}

Cursos.init(
  {
    idCurso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeCurso: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: mysqlDB,
    modelName: "Cursos",
    timestamps: false,
  }
);

mysqlDB
  .sync()
  .then(() => {
    console.log("A tabela Curso foi criada com sucesso!");
  })
  .catch((error) => {
    console.log("A tabela Curso não foi criada!" + error);
  });

exports.Cursos = Cursos;
