const express = require("express");
const { Professor } = require("../database/professor");
const Router = express.Router();

Router.get("/professor", async (req, res) => {
  try {
    const professor = await Professor.findAll({ raw: true });
    res.send(professor);
  } catch (error) {
    res.status(404);
  }
});

Router.post("/professor/criar", async (req, res) => {
  try {
    const { nome_professor, especialidade } = req.body;

    await Professor.create({
      nome_professor,
      especialidade,
    });
    res.status(201).json("Professor criado com sucesso");
  } catch (error) {
    res.status(401).json(error);
  }
});

Router.put("/professor/editar/:id", async (req, res) => {
  try {
    const { nome_professor, especialidade } = req.body;
    const id = req.params.id;

    const professor = await Professor.findByPk(id);

    professor.nome_professor = nome_professor;
    professor.especialidade = especialidade;
    professor.save();
    res.status(201).json("Editado com sucesso");
  } catch (error) {
    res.status(401).json("Não editado");
  }
});

Router.delete("/professor/excluir/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const professor = await Professor.findByPk(id)
        if(!professor){
            res.status(401).json("id nao encontrada")
        }
        await Professor.destroy({where : {id_professor : id}})
        res.json("Excluido com sucesso")
    }catch(error){
        res.json("Não excluido")
    }
})

module.exports = Router;
