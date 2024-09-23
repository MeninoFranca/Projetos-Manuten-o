const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");


const Curso = connection.define(
  "curso",
  {
    id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_curso: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    duracao: {
      type: DataTypes.DECIMAL(65),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(65, 2),
      allowNull: false,
    },
    id_Coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, 
    tableName: "curso", 
  }
);
/**/
async function sincronizarCurso() {
    try {
      await curso.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }
  module.exports = {
  Curso,
  sincronizarCurso
  };