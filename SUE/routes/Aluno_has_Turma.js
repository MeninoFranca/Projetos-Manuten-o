const express = require('express')
const {Aluno_has_Turma} = require('../database/Aluno_has_Turma')
const Router = express.Router()

Router.get("/aluno_has_turma",async (req,res)=>{
    try {
        const validada = await Aluno_has_Turma.findAll({
            raw : true
        }) 
        res.status(201).send(validada)
    } catch (error) {
        res.status(404)
        console.log(error)
    }
})

Router.post("/aluno_has_turma/criar",async (req,res)=>{
    try {
        const { 
            Aluno_id_Aluno,
            Turma_id_Turma
        } = req.body
        
        await Aluno_has_Turma.create({
            Aluno_id_Aluno,
            Turma_id_Turma
        })

        res.status(201).json("Criado com sucesso")
    } catch (error) {
        res.status(401).json("Falha na criação")
    }
})

Router.put("/aluno_has_turma/editar/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const{
            Aluno_id_Aluno,
            Turma_id_Turma
        } = req.body

        const db = await Aluno_has_Turma.findByPk(id)
        if(!db){
            res.status(401).json("Id não encontrado")
        }
        db.Aluno_id_Aluno = Aluno_id_Aluno
        db.Turma_id_Turma = Turma_id_Turma
        db.save()

        res.status(201).json("Editado com sucesso")
    } catch (error) {
        res.status(403).json("Edição não concluida")
        console.log(error)
    }
})

Router.delete("/aluno_has_turma/excluir/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const db = await Aluno_has_Turma.findByPk(id)
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