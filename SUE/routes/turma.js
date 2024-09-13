const express = require("express");
const { Turma } = require("../database/turma");
const router = express.Router();

router.get("/turma", async (req, res) => {
  try {
    const turma = await Turma.findAll({
      raw: true,
    });
    res.send(turma);
  } catch (error) {
    res.json(error);
  }
});

router.post("/turma/criar", async (req, res) => {
  try {
    const { nome_turma, ano, semestre } = req.body;

    await Turma.create({
      nome_turma,
      ano,
      semestre,
    });

    res.status(201).json("Criado com sucesso");
  } catch (error) {
    console.log(error)
    res.status(401).json("Erro ao inserir");
  }
});

router.put("/turma/editar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome_turma, ano, semestre } = req.body;

    const turma = await Turma.findByPk(id);

    turma.nome_turma = nome_turma;
    turma.ano = ano;
    turma.semestre = semestre;
    turma.save();
    res.json("Editado com sucesso");
  } catch (error) {
    res.json("Tabela não encontrada");
  }
});

router.delete("/turma/excluir/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const turma = await Turma.findByPk(id);
    if (!turma) {
      res.status(401).json("id nao encontrada");
    }
    await Turma.destroy({ where: { id_Turma: id } });
    res.json("excluido com sucesso");
  } catch (error) {
    res.status(401).json(error)
  }
});

module.exports = router;
