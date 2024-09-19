const express = require ('express');
const { ProfessorDisciplina } = require('../database/professordisciplina');
const Router = express.Router();

Router.get("/professordisciplina", async (req,res)=>{
    try {
        const pd = await ProfessorDisciplina.findAll({
            raw : true
        })
        res.status(201).send(pd)
    } catch (error) {
        res.status(401)
    }
})

Router.post("/professordisciplina/criar", async (req,res)=>{
    try {
        const {
            id_professor,
            id_disciplina
        } = req.body

        await ProfessorDisciplina.create({
            id_disciplina,
            id_professor
        })
        res.status(201)
    } catch (error) {
        res.status(401)
    }
})

Router.put("/professordisciplina/editar/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const{
            id_professor,
            id_disciplina
        } = req.body
        const relacionamento = await ProfessorDisciplina.findByPk(id)
        if(!relacionamento){
           res.status(401).json("Id disciplina nao encontrado") 
        }

        relacionamento.id_professor = id_professor;
        relacionamento.id_disciplina =
        id_disciplina;
        relacionamento.save()

        res.status(201)
    } catch (error) {
        res.status(404)
    }
})

Router.delete("/professordisciplina/excluir/:id",async (req,res)=>{
    try {
        const id = req.params.id
        
        const relacionamento = await ProfessorDisciplina.findByPk(id)
        if(!relacionamento){
           res.status(401).json("Id disciplina nao encontrado") 
        }
        relacionamento.destroy({where: {id : id}})
        res.status(201)
    } catch (error) {
        res.status(401)
    }
})

module.exports = Router