const express = require("express");
const { Disciplina } = require("../database/disciplinas");
const router = express.Router();

router.get('/disciplina', async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll({
            raw: true
        });
        res.send(disciplinas);
    } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        res.status(500).json({ error: "Erro ao buscar disciplinas." });
    }
});

router.post("/editar_disciplina/criar", async (req, res) => {
    const { nome_disciplina, carga_horaria, descricao_disciplina} = req.body;
    try {
            await Disciplina.create({
                nome_disciplina,
                carga_horaria,
                descricao_disciplina,
            });
            res.status(201)
            res.redirect("/disciplina");
        } 
        catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


router.post("/excluir_disciplina/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const disciplina = await Disciplina.findByPk(id);
        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }
        await Disciplina.destroy({ where: { id_disciplina: id } });
        res.redirect("/disciplina");
    } catch (error) {
        console.error("Erro ao excluir disciplina:", error);
        res.status(500).json({ error: "Erro ao excluir disciplina." });
    }
});

module.exports = router;