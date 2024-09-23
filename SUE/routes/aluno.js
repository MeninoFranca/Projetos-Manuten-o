const express = require("express");
const { Aluno } = require("../database/aluno");
const router = express.Router();

router.get("/aluno", async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      raw: true,
    });
    res.send(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

router.post("/aluno/criar", async (req, res) => {
  try {
    const { nome_aluno, Num_Matricula, Estado_Matricula } = req.body;

    await Aluno.create({
      nome_aluno,
      Num_Matricula,
      Estado_Matricula,
    });

    res.status(201);
    console.log("usuário criado com sucesso");
  } catch (error) {
    res.status(501).json(error);
    console.error(error);
  }
});

router.put("/aluno/editar/:id", async (req, res) => {
  try {
    const { nome_aluno, Num_Matricula, Estado_Matricula} = req.body;
    const id = req.params.id;

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      res.status(404).json("tabela nao encontrada");
    }

    aluno.nome_aluno = nome_aluno;
    aluno.Num_Matricula = Num_Matricula;
    aluno.Estado_Matricula = Estado_Matricula;

    await aluno.save();
  } catch (error) {
      res.status(501).json(error)
  }
});

router.delete("/aluno/excluir/:id", async (req,res)=>{
    try {
        const id = req.params.id
        const aluno = await Aluno.findByPk(id)
        if(!aluno){
            res.status(401).json("Tabela nao encontrada na coluna")
        }
        await aluno.destroy({where : {id_Aluno: id}})
        res.status(201).json("Excluido com sucesso")
    } catch (error) {
        res.status(401).json("Falha na conexao")
    }
})

module.exports = router;
