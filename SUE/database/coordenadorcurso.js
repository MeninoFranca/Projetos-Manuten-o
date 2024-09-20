const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 

const CoordenadorCurso = sequelize.define(
"coordenadorcurso",
  {
    id_Coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Coordenador",
        key: "id_Coordenador",
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
    tableName: "coordenadorcurso",
    timestamps: true,
  }
);
/**/
async function sincronizarCoordenadorCurso() {
  try {
    await CoordenadorCurso.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

module.exports ={
  CoordenadorCurso,
  sincronizarCoordenadorCurso
};
  