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

router.post("/aluno/criar",async(req,res)=>{
    try {
        const{
            nome_aluno,
            Num_Matricula,
            Estado_Matricula
        } = req.body;

        await Aluno.create({
            nome_aluno,
            Num_Matricula,
            Estado_Matricula
        })

        res.status(201)
        console.log("usuário criado com sucesso")
    } catch (error) {
        res.status(501).json(error)
        console.error(error)
    }
})



module.exports = router;
