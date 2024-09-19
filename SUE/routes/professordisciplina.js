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

Router.put("/professordisciplina/editar/:professor/:disciplina",async (req,res)=>{
    try {
        const professor = req.params.professor
        const disciplina = req.params.disciplina

        const{
            id_professor,
            id_disciplina
        } = req.body

        const professorr = await ProfessorDisciplina.findByPk(professor)
        if(!professorr){
           res.status(401).json("Id professor nao encontrado") 
        }
        const disciplinaa = await ProfessorDisciplina.findByPk(disciplina)
        if(!disciplinaa){
           res.status(401).json("Id disciplina nao encontrado") 
        }

        professorr.id_professor = id_professor;
        disciplinaa.id_disciplina =
        id_disciplina;
        ProfessorDisciplina.save()

        res.status(201)
    } catch (error) {
        res.status(404)
    }
})

Router.delete("/professordisciplina/excluir/:professor/:disciplina",async (req,res)=>{
    try {
        const professor = req.params.professor
        const disciplina = req.params.disciplina
        const professorr = await ProfessorDisciplina.findByPk(professor)
        if(!professorr){
           res.status(401).json("Id professor nao encontrado") 
        }
        const disciplinaa = await ProfessorDisciplina.findByPk(disciplina)
        if(!disciplinaa){
           res.status(401).json("Id disciplina nao encontrado") 
        }
        await ProfessorDisciplina.destroy({where: {id_disciplina : disciplinaa},where: {id_professor : id_professorr}})
        res.status(201)
    } catch (error) {
        res.status(401)
    }
})

module.exports = Router