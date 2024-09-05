const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 
class ProfessorDisciplinaVW extends Model {}

ProfessorDisciplinaVW.init(
  {
    id_Professor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        references: {
          model: "Professor",
          key: "id_Professor",
        },
    },
    nome_professor: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    id_disciplina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Disciplina",
          key: "id_disciplina",
        },
    },
    nome_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    carga_horaria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    descricao_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    sequelize,
    modelName: "ProfessorDisciplinaVW",
    tableName: "vw_professor_disciplina",
    timestamps: false,
  }
);
/*
async function sincronizarProfessorDisciplinaVW() {
  try {
    await ProfessorDisciplinaVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

ProfessorDisciplinaVW.sync({ force: false }).then(() => {});
*/
module.exports = ProfessorDisciplinaVW;
