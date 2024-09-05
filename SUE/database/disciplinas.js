const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");


const Disciplina = connection.define(
  "disciplina",
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

// Função para sincronizar a tabela Disciplina com o banco de dados
async function sincronizarDisciplina() {
  try {
    // Sincronizando o modelo com o banco de dados
    await Disciplina.sync({ force: false });
    console.log("Tabela sincronizada com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    // Fechando a conexão com o banco de dados
    await connection.close();
    console.log("Conexão fechada.");
  }
}

// Exportando o modelo e a função
module.exports = {
  Disciplina,
  sincronizarDisciplina
};
