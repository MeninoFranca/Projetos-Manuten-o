const express = require("express");
const { Avaliacao } = require("../database/avaliacao");
const router = express.Router();

router.get("/avaliacao", async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findAll({
      raw: true,
    });
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/avaliacao/criar", async (req, res) => {
  try {
    const { nome_avaliacao, valor, data } = req.body;

    await Avaliacao.create({
      nome_avaliacao,
      valor,
      data,
    });
    res.status(201).json("Sucesso");
  } catch (error) {
    res.status(401).json({ error: `Dados não inseridos na tabela` });
  }
});

router.put("/avaliacao/editar/:id", async (req, res) => {
  try {
    const { nome_avaliacao, valor, nota } = req.body;
    const id = req.params.id;

    const avaliacao = await Avaliacao.findByPk(id);
    if (!avaliacao) {
      res.status(403).json("Id não encontrado");
    }

    avaliacao.nome_avaliacao = nome_avaliacao;
    avaliacao.valor = valor;
    avaliacao.nota = nota;
    avaliacao.save();
    res.status(201).json("Editado com sucesso");
  } catch (error) {
    res.status(402).json("Arquivo não achado");
  }
});

router.delete("/avaliacao/excluir/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const avaliacao = await Avaliacao.findByPk(id)
        if(!avaliacao){
            res.status(401).json("id nao encontrada")
        }
    await Avaliacao.destroy({ where: { id_Avaliacao: id } });
    res.status(200).json("Excluido com sucesso")
  } catch (error) {
    res.status(401).json("Não excluido")
  }
});

module.exports = router;
