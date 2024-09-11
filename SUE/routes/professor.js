const express = require('express')
const {Professor} = require ('../database/professor')
const Router = express.Router()

Router.get("/professor", async (req,res)=>{
    try {
        const professor = await Professor.findAll({raw : true})
        res.send(professor)
    } catch (error) {
        res.status(404)
    }
})

module.exports = Router