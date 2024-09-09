const express = require("express");
const { Aluno } = require("../database/aluno"); 
const router = express.Router();

router.get('/aluno', async (req, res) => {
    try {
        const alunos = await Aluno.findAll({
            raw: true
        });
        res.send(alunos);
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        res.status(500).json({ error: "Erro ao buscar alunos." });
    }
});



module.exports = router;
