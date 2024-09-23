const express = require("express");
const { Pagamento } = require("../database/pagamentoaluno");
const Router = express.Router();

Router.get("/pagamentoaluno", async (req, res) => {
    try{
        const validacao = await Pagamento.findAll({
            raw : true
        })
        res.status(201).send(validacao)
    }catch(e){
        console.log(e)
        res.status(401).json("Conexão não estabelecida")
    }
});

Router.post("/pagamentoaluno/criar",async (req,res)=>{
    try{
        const {
            id_Pagamento,
            id_Aluno
        } = req.body

        await Pagamento.create({
            id_Pagamento,
            id_Aluno    
        })

        res.status(201).json("Criado com sucesso")
    } catch(e){
        console.log(e)
        res.status(401).json("Falha ao tentar criar")
    }
})

Router.delete("/pagamentoaluno/excluir/:pagamento/:aluno",async (req,res)=>{
    try{
        const pagamento = req.params.pagamento
        const aluno = req.params.aluno 
     
        const validacaopagamento = await Pagamento.findByPk(pagamento)
        if(!validacaopagamento){
            res.status(403).json("id pagamento nao encontrado")
        }
        const validacaoaluno = await Pagamento.findByPk(aluno)
        if(!validacaoaluno){
            res.status(403).json("id aluno nao encontrado")
        }

        await Pagamento.destroy({
            where :
            {id_Pagamento : validacaopagamento}, where :
            {id_Aluno : validacaoaluno}
        })
        res.status(201).json("Excluido com sucesso")
    } catch(e){
        console.log(e)
        res.status(401).json("Falha ao tentar excluir")
    }
})

module.exports = Router;
