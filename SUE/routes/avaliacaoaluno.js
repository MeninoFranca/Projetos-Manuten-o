const express = require("express");
const { AvaliacaoAluno } = require("../database/avaliacaoaluno");
const Router = express.Router();

Router.get("/avaliacaoaluno", async (req, res) => {
    try{
        const validacao = await AvaliacaoAluno.findAll({
            raw : true
        })
        res.status(201).send(validacao)
    }catch(e){
        console.log(e)
        res.status(401).json("Conexão não estabelecida")
    }
});

Router.post("/avaliacaoaluno/criar",async (req,res)=>{
    try{
        const {
            id_Avaliacao,
            id_Aluno
        } = req.body

        await AvaliacaoAluno.create({
            id_Avaliacao,
            id_Aluno    
        })

        res.status(201).json("Criado com sucesso")
    } catch(e){
        console.log(e)
        res.status(401).json("Falha ao tentar criar")
    }
})

Router.delete("/avaliacaoaluno/excluir/:avaliacao/:aluno",async (req,res)=>{
    try{
        const avaliacao = req.params.avaliacao
        const aluno = req.params.aluno 
     
        const validacaoavaliacao = await AvaliacaoAluno.findByPk(avaliacao)
        if(!validacaoavaliacao){
            res.status(403).json("id avaliacao nao encontrado")
        }
        const validacaoaluno = await AvaliacaoAluno.findByPk(aluno)
        if(!validacaoaluno){
            res.status(403).json("id aluno nao encontrado")
        }

        await AvaliacaoAluno.destroy({
            where :
            {id_Avaliacao : validacaoavaliacao}, 
            where :
            {id_Aluno : validacaoaluno}
        })
        res.status(201).json("Excluido com sucesso")
    } catch(e){
        console.log(e)
        res.status(401).json("Falha ao tentar excluir")
    }
})

module.exports = Router;
