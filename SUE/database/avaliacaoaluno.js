const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 
const AvaliacaoAluno = sequelize.define( 
"avaliacaoaluno",
  {
    id_Avaliacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Avaliacao",
        key: "id_Avaliacao",
      },
    },
    id_Aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Aluno",
        key: "id_Aluno",
      },
    },
  },
  {
    tableName: "avaliacaoaluno",
    timestamps: false,
  }
);
/**/
async function sincronizarAvaliacaoAluno() {
  try {
    await AvaliacaoAluno.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}


module.exports = {
  AvaliacaoAluno,
  sincronizarAvaliacaoAluno
};
