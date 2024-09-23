const express = require("express");
const {Curso} = require('../database/curso');
const router = express.Router();

router.get("/curso", async (req,res)=>{
    try{
        const curso = await Curso.findAll({
            raw: true
        });
        res.status(200).send(curso)
    }catch(error){
        console.log(error)
        res.status(401).json("Não encontrado")
    }
})

router.post("/curso/criar", async (req,res)=>{
    try {
        const {
            nome_curso,
            duracao,
            valor,
            id_Coordenador
        } = req.body;

        await Curso.create({
            nome_curso,
            duracao,
            valor,
            id_Coordenador
        })
        res.status(201).json("Curso criado com sucesso")
    } catch (error) {
        console.log(error)
        res.status(401).json("ERROR ao inserir")
    }
})

router.put("/curso/editar/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const {
            nome_curso,
            duracao,
            valor,
            id_Coordenador
        } = req.body;

        const curso = await Curso.findByPk(id)
        if(!curso){
            res.status(401).json("Tabela não encontrada pelo id fornecido")
        }
        curso.nome_curso = nome_curso
        curso.duracao = duracao
        curso.valor = valor
        curso.id_Coordenador = id_Coordenador
        curso.save()
        res.status(201).json("Editado com sucesso")
    }catch(error){
        console.log(error)
        res.status(401).json("Erro ao tentar editar")
    }
})

router.delete("/curso/excluir/:id", async (req,res)=>{
    try {
        const id = req.params.id

        const curso = await Curso.findByPk(id)
        if(!curso){
            res.status(401).json("Tabela não encontrada pelo id fornecido")
        }
        await Curso.destroy({where : {id_Curso:id}})
        res.status(201).json("Excluido com sucesso")
    } catch (error) {
        res.status(401).json("Erro ao tentar excluir")
    }
})

module.exports = router;