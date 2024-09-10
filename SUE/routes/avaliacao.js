const express = require('express');
const { Avaliacao } = require('../database/avaliacao');
const router = express.Router();

router.get("/avaliacao", async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findAll({
      raw: true
    });
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
