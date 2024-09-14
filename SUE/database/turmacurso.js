const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 

class turmacurso  extends Model {}

turmacurso.init(
  {
    id_Turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Turma",
        key: "id_Turma",
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
    sequelize,
    modelName: "turmacurso",
    tableName: "turmacurso",
    timestamps: true,
  }
);
/**/
async function sincronizarTurmaCurso() {
  try {
    await TurmaCurso.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}


module.exports = turmacurso;
