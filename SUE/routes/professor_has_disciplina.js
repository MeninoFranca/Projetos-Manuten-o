const express = require('express')
const {Professor_has_Disciplina} = require('../database/Professor_has_Disciplina')
const Router = express.Router()

Router.get("/professor_has_disciplina",async (req,res)=>{
    try {
        const validada = await Professor_has_Disciplina.findAll({
            raw : true
        }) 
        res.status(201).send(validada)
    } catch (error) {
        res.status(404)
        console.log(error)
    }
})

Router.post("/professor_has_disciplina/criar",async (req,res)=>{
    try {
        const { 
            Professor_id_Professor,
            Disciplina_id_Disciplina
        } = req.body
        
        await Professor_has_Disciplina.create({
            Professor_id_Professor,
            Disciplina_id_Disciplina
        })

        res.status(201).json("Criado com sucesso")
    } catch (error) {
        res.status(401).json("Falha na criação")
    }
})

Router.put("/professor_has_disciplina/editar/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const{
            Professor_id_Professor,
            Disciplina_id_Disciplina
        } = req.body

        const db = await Professor_has_Disciplina.findByPk(id)
        if(!db){
            res.status(401).json("Id não encontrado")
        }
        db.Disciplina_id_Disciplina = Disciplina_id_Disciplina
        db.Professor_id_Professor = Professor_id_Professor
        db.save()

        res.status(201).json("Editado com sucesso")
    } catch (error) {
        res.status(403).json("Edição não concluida")
        console.log(error)
    }
})

Router.delete("/professor_has_disciplina/excluir/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const db = await Professor_has_Disciplina.findByPk(id)
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