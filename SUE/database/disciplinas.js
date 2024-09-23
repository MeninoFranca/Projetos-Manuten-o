const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Disciplina = connection.define(
  "Disciplina",  
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_disciplina: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    carga_horaria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao_disciplina: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "disciplina",
  }
);

async function sincronizarDisciplina() {
  try {
    await Disciplina.sync({ force: false });
    console.log("Tabela sincronizada com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  }
}

module.exports = {
  Disciplina,
  sincronizarDisciplina
};
