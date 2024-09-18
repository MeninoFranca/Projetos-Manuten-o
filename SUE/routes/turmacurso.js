const express = require("express")
const { turmacurso } = require("../database/turmacurso")
const router = express.Router()

router.get("/turmacurso",async (req,res)=>{
    try {
        const turma = await turmacurso.findAll({
            raw : true
        })
        res.send(turma)
    } catch (error) {
        res.status(401)
    }
})

router.post("/turmacurso/criar",async (req,res)=>{
    try{
        const {
            id_Turma,
            id_Curso
        } = req.body
        await turmacurso.create({
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

router.put("/turmacurso/editar/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const {
            id_Turma,
            id_Curso
        } = req.body
        const idvalidar = await turmacurso.findByPk(id)
        if(!idvalidar){
            res.status(403).json("Id não encontrado")
        }
        turmacurso.id_Turma = id_Turma
        turmacurso.id_Curso = id_Curso
        turmacurso.save()
        res.status(201)
    } catch (error){
        res.status(401)
        console.log(error)
    }
})

router.delete("/turmacurso/excluir/:id",async (req,res)=>{
    try{

    }
    catch (error){

    }
})

module.exports = router