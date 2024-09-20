const express = require("express");
const { CoordenadorCurso } = require("../database/coordenadorcurso");
const Router = express.Router();

Router.get("/coordenadorcurso", async (req, res) => {
    try{
        const validacao = await CoordenadorCurso.findAll({
            raw : true
        })
        res.status(201).send(validacao)
    }catch(e){
        console.log(e)
        res.status(401).json("Conexão não estabelecida")
    }
});

Router.post("/coordenadorcurso/criar",async (req,res)=>{
    try{
        const {
            id_Coordenador,
            id_Curso
        } = req.body

        await CoordenadorCurso.create({
            id_Coordenador,
            id_Curso    
        })

        res.status(201).json("Criado com sucesso")
    } catch(e){
        console.log(e)
        res.status(401).json("Falha ao tentar criar")
    }
})

Router.delete("/coordenadorcurso/excluir/:coordenador/:curso",async (req,res)=>{
    try{
        const coordenador = req.params.coordenador
        const curso = req.params.curso 
     
        const validacaocoordenador = await CoordenadorCurso.findByPk(coordenador)
        if(!validacaocoordenador){
            res.status(403).json("id pagamento nao encontrado")
        }
        const validacaocurso = await CoordenadorCurso.findByPk(curso)
        if(!validacaocurso){
            res.status(403).json("id aluno nao encontrado")
        }

        await CoordenadorCurso.destroy({
            where :
            {id_Coordenador : validacaocoordenador}, where :
            {id_Curso : validacaocurso}
        })
        res.status(201).json("Excluido com sucesso")
    } catch(e){
        console.log(e)
        res.status(401).json("Falha ao tentar excluir")
    }
})

module.exports = Router;
