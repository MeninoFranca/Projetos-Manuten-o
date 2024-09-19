const { DataTypes } = require('sequelize');
const db = require('./database'); 

const ProfessorDisciplina = db.define(
  'ProfessorDisciplina',
   {
    id_professor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Professor",
      key: "id_Professor",
    },
  },
   id_disciplina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Disciplina",
      key: "id_disciplina",
    },
  }
}, {
  tableName: 'professordisciplina', 
  timestamps: false, 
  
 
});
/**/
async function sincronizarProfessorDisciplina() {
  try {
      await ProfessorDisciplina.sync({ force: false });
  } catch (error) {
      console.error("Erro ao sincronizar a tabela Aluno: ", error);
  }
}
module.exports = {
    ProfessorDisciplina,
    sincronizarProfessorDisciplina
};



