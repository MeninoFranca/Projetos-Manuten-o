const { DataTypes } = require('sequelize');
const connection = require('./database'); 

const Aluno = connection.define(
    'aluno', 
    {
        id_Aluno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nome_aluno: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        Num_Matricula: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        Estado_Matricula: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName: 'aluno',
        timestamps: false,
    }
);


async function sincronizarAluno() {
    try {
        await Aluno.sync({ force: false });
        console.log("Tabela Aluno sincronizada com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar a tabela Aluno: ", error);
    }
}

module.exports = {
    Aluno,
    sincronizarAluno
};
