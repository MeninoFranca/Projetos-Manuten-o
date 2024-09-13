const express = require("express");
const { Coordenador } = require("../database/coordenador");
const router = express.Router();

router.get("/coordenador", async (req, res) => {
  try {
    const coordenador = await Coordenador.findAll({
      raw: true,
    });
    res.status(201).send(coordenador);
  } catch (error) {
    res.status(401).json("erro ao tentar puxar dados");
    console.log(error);
  }
});

router.post("/coordenador/criar", async (req, res) => {
  try {
    const { nome_coordenador, email } = req.body;
    await Coordenador.create({
      nome_coordenador,
      email,
    });
    res.status(201).json("Criado com sucesso");
  } catch (error) {
    res.status(401).json("Erro ao tentar inserir");
    console.log(error);
  }
});

router.put("/coordenador/editar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome_coordenador, email } = req.body;

    const coordenador = await Coordenador.findByPk(id);
    if (!coordenador) {
      res.status(401).json("Tabela do id fornecido nao encontrada");
    }
    coordenador.nome_coordenador = nome_coordenador
    coordenador.email = email
    coordenador.save();
    res.status(201)
  } catch (error) {
    res.status(401).json("nao editado");
  }
});

router.delete("/coordenador/excluir/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const coordenador = await Coordenador.findByPk(id);
    if (!id) {
      res.status(401).json("Tabela não encontrada");
    }
    coordenador.destroy({ where: { id_Coordenador: id } });
    res.status(201).json("Excluido com sucesso");
  } catch (error) {
    res.status(401).json("Erro ao tentar excluir");
  }
});

module.exports = router;
