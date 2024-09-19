const express = require("express");
const { Pagamento } = require("../database/pagamento");
const router = express.Router();

router.get("/pagamento", async (req, res) => {
  try {
    const pagamento = await Pagamento.findAll({
      raw: true,
    });
    res.status(201).send(pagamento);
  } catch (error) {
    res.status(401).json("Erro ao tentar puxar dados");
  }
});

router.post("/pagamento/criar", async (req, res) => {
  try {
    const { nome_pagamento, valor, data_pay, taxa, desconto, Valor_Total } =
      req.body;

    await Pagamento.create({
      nome_pagamento,
      valor,
      data_pay,
      taxa,
      desconto,
      Valor_Total,
    });

    res.status(201).json("Criados com sucesso");
  } catch (error) {
    res.status(401).json("Erro ao tentar criar os arquivos");
  }
});

router.put("/pagamento/editar/:id", async (req, res) => {
  try {
    const { nome_pagamento, valor, data_pay, taxa, desconto, Valor_Total } =
      req.body;

    const id = req.params.id;

    const pagamento = await Pagamento.findByPk(id);
    if (!id) {
      res.status(401).json("dados não encontrado");
    }

    pagamento.nome_pagamento = nome_pagamento;
    pagamento.valor = valor;
    pagamento.data_pay = data_pay;
    pagamento.taxa = taxa;
    pagamento.desconto = desconto;
    pagamento.Valor_Total = Valor_Total;
    pagamento.save();
    res.status(201);
  } catch (error) {
    res.status(401);
  }
});

router.delete("/pagamento/excluir/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pagamento = await Pagamento.findByPk(id);
    if (!id) {
      res.status(401).json("dados não encontrado");
    }
    pagamento.destroy({ where: { id_Pagamento: id } });
    res.status(201)
  } catch (error) {
      res.status(401)
  }
});

module.exports = router
