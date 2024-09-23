const { DataTypes, Sequelize } = require('sequelize');
const connection  = require('./database'); 

const Pagamento = connection.define(
    'pagamento', 
    {
        id_Pagamento: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         autoIncrement: true,
        },
        nome_pagamento: {
         type: DataTypes.STRING,
         allowNull: true,
        },
        valor: {
         type: DataTypes.DECIMAL,
         allowNull: true,
        },
        data_pay: {
         type: DataTypes.DATE,
        },
        taxa: {
         type: DataTypes.DECIMAL,
         allowNull: true,
        },
        desconto: {
         type: DataTypes.DECIMAL,
         allowNull: true,
        },
        Valor_Total: {
         type: DataTypes.INTEGER,
         allowNull: true,
        },
        id_Aluno: {
         type: DataTypes.INTEGER,
         allowNull: true,
        },
    }, 
    {
        tableName: 'pagamento',
        timestamps: true,

    }
);

async function sincronizarPagamento() {
    try {
        await Pagamento.sync({ force: false });
        console.log('Modelo de Pagamento sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o modelo de Pagamento:', error);
    } finally {
        await connection.close();  // Fechando a conexão com o banco de dados após a sincronização
        console.log('Conexão fechada.');
    }
}

module.exports = {
    Pagamento,
    sincronizarPagamento
};



