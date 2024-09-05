const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class PagamentoAlunoVW extends Model {}

PagamentoAlunoVW.init(
  {
    id_Pagamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        references: {
          model: "Pagamento",
          key: "id_Pagamento",
        },
    },
    nome_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
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
    nome_aluno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.INTEGER, // Ajuste o tipo de dado conforme necessário
      allowNull: false,
    },
    data_pay: {
      type: DataTypes.DATE, // Ajuste o tipo de dado conforme necessário
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PagamentoAlunoVW",
    tableName: "vw_pagamento_aluno",
    timestamps: false,
  }
);

module.exports = PagamentoAlunoVW;
