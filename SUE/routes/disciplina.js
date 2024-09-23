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

router.post("/disciplina/criar", async (req, res) => {
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

router.put("/disciplina/editar/:id", async(req,res) =>{
    try {
        const id = req.params.id
        const {
            nome_disciplina,
            carga_horaria,
            descricao_disciplina
        } = req.body
        
        const disciplina = await Disciplina.findByPk(id)
        if(!disciplina){
            return res.status(404).json({error : `Tabela ${id} não encontrada`})
        }
        disciplina.nome_disciplina = nome_disciplina
        disciplina.carga_horaria = carga_horaria
        disciplina.descricao_disciplina = descricao_disciplina
        await disciplina.save()
        res.status(201)
    } catch (error) {
        res.error(`erro em editar os dados da tabela`)
    }
})
router.delete("/disciplina/excluir/:id", async (req, res) => {
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