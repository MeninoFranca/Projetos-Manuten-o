const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

const DisciplinaCurso = sequelize.define(
  "disciplinacurso",
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Disciplina",
        key: "id_disciplina",
      },
    },
    id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Curso",
        key: "id_Curso",
      },
    },
  },
  {
    tableName: "disciplinacurso",
    timestamps: true,
  }
);
/**/
async function sincronizarDisciplinaCurso() {
  try {
    await DisciplinaCurso.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

module.exports = { 
  DisciplinaCurso, sincronizarDisciplinaCurso
 };
