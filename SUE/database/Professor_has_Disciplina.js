const { DataTypes } = require('sequelize');
const db = require('./database');

const Professor_has_Disciplina = db.define(
  'Professor_has_Disciplina',
   {
    Professor_id_Professor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Disciplina_id_Disciplina: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Professor_has_Disciplina', 
  timestamps: false, 
  
 
});
/**/
async function sincronizarProfessor_has_Disciplina() {
  try {
      await Professor_has_Disciplina.sync({ force: false });
  } catch (error) {
      console.error("Erro ao sincronizar a tabela Aluno: ", error);
  }
}

module.exports = {
    Professor_has_Disciplina,sincronizarProfessor_has_Disciplina
};

