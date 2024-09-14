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

module.exports = router