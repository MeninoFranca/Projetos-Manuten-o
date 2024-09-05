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

router.post("/editar_disciplina", async (req, res) => {
    const { nome_disciplina, carga_horaria, descricao_disciplina, action, id_disciplina } = req.body;
    try {
        if (action === "incluir") {
            await Disciplina.create({
                nome_disciplina,
                carga_horaria,
                descricao_disciplina,
            });
            res.redirect("/disciplina");
        } else if (action === "alterar") {
            const disciplina = await Disciplina.findByPk(id_disciplina);
            if (!disciplina) {
                return res.status(404).json({ error: `Disciplina não encontrada - ID: ${id_disciplina}.` });
            }

            disciplina.nome_disciplina = nome_disciplina;
            disciplina.carga_horaria = carga_horaria;
            disciplina.descricao_disciplina = descricao_disciplina;
            await disciplina.save();

            res.redirect("/disciplina");
        } else {
            res.status(400).json({ error: "Ação inválida." });
        }
    } catch (error) {
        console.error("Erro ao processar dados da disciplina:", error);
        res.status(500).json({ error: "Erro ao processar dados da disciplina." });
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
