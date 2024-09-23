const exp = require ('express')
const {Curso_has_Disciplina} = require ('../database/Curso_has_Disciplina')
const Router = exp.Router()

Router.get("/cursohasdisciplina",async(req,res)=>{
    try {
        res.status(201).send(await Curso_has_Disciplina.findAll({
            raw : true
        }))
    } catch (error) {
        res.status(403).json("falha ao tentar se comunicar")
    }
})

Router.post("/cursohasdisciplina/criar",async (req,res)=>{
    try {
        const {
            Curso_id_Curso,
            Disciplina_id_Disciplina
        } = req.body;

        await Curso_has_Disciplina.create({
            Curso_id_Curso,
            Disciplina_id_Disciplina
        })

        res.status(201).json("Criado com sucesso")

    } catch (error) {
        res.status(401).json("Erro ao tentar criar")
    }
})

Router.put("/cursohasdisciplina/editar/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const {
            Curso_id_Curso,
            Disciplina_id_Disciplina
        } = req.body;
        const validaid = await Curso_has_Disciplina.findByPk(id)
        if(!validaid)
            res.status(401).json("Id nao encontrado")
        validaid.Curso_id_Curso = Curso_id_Curso
        validaid.Disciplina_id_Disciplina = Disciplina_id_Disciplina
        validaid.save()
        res.status(201).json("Editado com sucesso")
    } catch (error) {
        res.status(403).json("Falha ao tentar editar")
    }
})

Router.delete("/cursohasdisciplina/excluir/:id",async (req,res)=>{
    try {
        const id = req.params.id;
        const validaid = await Curso_has_Disciplina.findByPk(id);
        if (!validaid) {
            return res.status(404).json({ error: "id não encontrado." });
        }
        await Curso_has_Disciplina.destroy({ where: { id: id } });
        res.status(201).json("excluido com sucesso")
    } catch (error) {
        console.error("Erro ao excluir:", error);
        res.status(500).json({ error: "Erro ao excluir." });
    }
})

module.exports = Router