const express = require('express')
const {Aluno_has_Curso} = require('../database/Aluno_has_Curso')
const Router = express.Router()

Router.get("/aluno_has_curso",async (req,res)=>{
    try {
        const validada = await Aluno_has_Curso.findAll({
            raw : true
        }) 
        res.status(201).send(validada)
    } catch (error) {
        res.status(404)
        console.log(error)
    }
})

Router.post("/aluno_has_curso/criar",async (req,res)=>{
    try {
        const { 
            Aluno_id_Aluno,
            Curso_id_Curso
        } = req.body
        
        await Aluno_has_Curso.create({
            Aluno_id_Aluno,
            Curso_id_Curso
        })

        res.status(201).json("Criado com sucesso")
    } catch (error) {
        res.status(401).json("Falha na criação")
    }
})

Router.put("/aluno_has_curso/editar/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const{
            Aluno_id_Aluno,
            Curso_id_Curso
        } = req.body

        const db = await Aluno_has_Curso.findByPk(id)
        if(!db){
            res.status(401).json("Id não encontrado")
        }
        db.Aluno_id_Aluno = Aluno_id_Aluno
        db.Curso_id_Curso = Curso_id_Curso
        db.save()

        res.status(201).json("Editado com sucesso")
    } catch (error) {
        res.status(403).json("Edição não concluida")
        console.log(error)
    }
})

Router.delete("/aluno_has_curso/excluir/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const db = await Aluno_has_Curso.findByPk(id)
        if(!db){
            res.status(403).json("Tabela não encontrada")
        }
        db.destroy({where: {id : id}})
        res.status(201).json("Excluido com sucesso")
    } catch (error) {
        res.status(401)
        console.log(error)
    }
})

module.exports = Router