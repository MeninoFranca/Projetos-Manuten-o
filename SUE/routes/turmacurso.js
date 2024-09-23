const express = require("express")
const { Turmacurso } = require("../database/turmacurso")
const router = express.Router()

router.get("/turmacurso",async (req,res)=>{
    try {
        const turma = await Turmacurso.findAll({
            raw : true
        })
        res.status(201).send(turma)
    } catch (error) {
        console.log(error)
        res.status(401)
    }
})

router.post("/turmacurso/criar",async (req,res)=>{
    try{
        const {
            id_Turma,
            id_Curso
        } = req.body
        await Turmacurso.create({
            id_Turma,
            id_Curso
        })
        res.status(201)
    }
    catch(error){
        console.log(error)
        res.status(401)
    }
})

router.put("/turmacurso/editar/:turma/:curso",async (req,res)=>{
    try {
        const turma = req.params.turma
        const curso = req.params.curso
        const {
            id_Turma,
            id_Curso
        } = req.body
        
        const turmaa = await Turmacurso.findByPk(turma)
        if(!turmaa){
            res.status(403).json("Id não encontrado")
        }
        const cursoo = await Turmacurso.findByPk(curso)
        if(!cursoo){
            res.status(403).json("Id não encontrado")
        }
        Turmacurso.id_Turma = id_Turma
        Turmacurso.id_Curso = id_Curso
        Turmacurso.save()
        res.status(201)
    } catch (error){
        res.status(401)
        console.log(error)
    }
})

router.delete("/turmacurso/excluir/:turma/:curso",async (req,res)=>{
    try{
        const turma = req.params.turma
        const curso = req.params.curso
        await Turmacurso.destroy({where: {id_Turma : turma}, where : {id_Curso : curso}})
        res.status(201)
    }
    catch (error){
        console.log(error)
        res.status(401)
    }
})

module.exports = router