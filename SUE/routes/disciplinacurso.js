const express = require ('express')
const {DisciplinaCurso} = require('../database/disciplinacurso')
const Router = express.Router()

Router.get("/disciplinacurso",async (req,res)=>{
    try {
        const validacao = await DisciplinaCurso.findAll({
            raw : true
        })
        res.status(201).send(validacao)
    } catch (error) {
        res.status(403).json("Erro ao tentar fazer o Get")
    }
})

Router.post("/disciplinacurso/criar", async (req,res)=>{
    try {
        const {
            id_disciplina,
            id_Curso
        } = req.body

        await DisciplinaCurso.create({
            id_disciplina,
            id_Curso
        })

        res.status(201).json("Criado com sucesso")
    } catch (error) {
        req.status(401).json("Falha ao tentar criar")
    }
})

Router.delete("/disciplinacurso/excluir/:disciplina/:curso",async (req,res)=>{
    try{
        const disciplina = req.params.disciplina
        const curso = req.params.curso

        const validacaodisciplina = await DisciplinaCurso.findByPk(disciplina)
        if(!validacaodisciplina){
            res.status(403).json("Id disciplina nao encontrado")
        }
        const validacaocurso = await DisciplinaCurso.findByPk(curso)
        if(!validacaocurso){
            res.status(403).json("Id curso nao encontrado")
        }

        await DisciplinaCurso.destroy({
            where : {id_disciplina : validacaodisciplina},
            where : {id_Curso : validacaocurso}
        })
        res.status(201).json("Excluido com sucesso")
    }catch(e){
        res.status(403).json("Erro ao tentar excluir")
    }
})


module.exports = Router
