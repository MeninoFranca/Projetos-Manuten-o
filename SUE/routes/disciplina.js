const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

// Inicializar o aplicativo Express
const app = express();
const PORT = 3500;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do motor de template (ex: EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuração do banco de dados
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', // ou 'mysql', 'postgres', 'mssql'
    storage: './database.sqlite' // para SQLite
});

const Disciplina = sequelize.define('Disciplina', {
    nome_disciplina: {
        type: DataTypes.STRING,
        allowNull: false
    },
    carga_horaria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao_disciplina: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'disciplinas'
});

// Sincronizar o banco de dados
sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado.');
}).catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});

// Definir as rotas
const router = express.Router();

router.get('/disciplina', async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll({
            raw: true,
            order: [["id_disciplina", "DESC"]],
        });
        res.render("cad_disciplinas", { disciplinas });
    } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        res.status(500).json({ error: "Erro ao buscar disciplinas." });
    }
});

router.post("/editar_disciplina", async (req, res) => {
    const { nome_disciplina, carga_horaria, descricao_disciplina, action, id_disciplina } = req.body;

    try {
        if (action === "incluir") {
            await Disciplina.create({
                nome_disciplina,
                carga_horaria,
                descricao_disciplina,
            });
            res.redirect("/disciplina");
        } else if (action === "alterar") {
            const disciplina = await Disciplina.findByPk(id_disciplina);
            if (!disciplina) {
                return res.status(404).json({ error: `Disciplina não encontrada - ID: ${id_disciplina}.` });
            }

            disciplina.nome_disciplina = nome_disciplina;
            disciplina.carga_horaria = carga_horaria;
            disciplina.descricao_disciplina = descricao_disciplina;
            await disciplina.save();

            res.redirect("/disciplina");
        } else {
            res.status(400).json({ error: "Ação inválida." });
        }
    } catch (error) {
        console.error("Erro ao processar dados da disciplina:", error);
        res.status(500).json({ error: "Erro ao processar dados da disciplina." });
    }
});

router.post("/excluir_disciplina/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const disciplina = await Disciplina.findByPk(id);
        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }

        await Disciplina.destroy({ where: { id_disciplina: id } });
        res.redirect("/disciplina");
    } catch (error) {
        console.error("Erro ao excluir disciplina:", error);
        res.status(500).json({ error: "Erro ao excluir disciplina." });
    }
});

// Usar o roteador
app.use("/disciplina", router);

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
