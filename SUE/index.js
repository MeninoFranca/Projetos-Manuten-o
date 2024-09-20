const express = require("express");
const app = express();
const port = 3500;

const connection = require("./database/database");
const Disciplina = require("./routes/disciplina"); 
const Curso = require("./routes/curso");
const Professor = require("./routes/professor");
const Coordenador = require("./routes/coordenador");
const Aluno = require("./routes/aluno");
const Turma = require("./routes/turma");
const Avaliacao = require("./routes/avaliacao");
const CoordenadorCurso = require("./routes/coordenadorcurso");
const TurmaCurso = require("./routes/turmacurso");
const ProfessorDisciplina = require("./routes/professordisciplina");
const DisciplinaCurso = require("./routes/disciplinacurso");
const AvaliacaoAluno = require("./routes/avaliacaoaluno");
const Pagamento = require("./routes/pagamento");
const PagamentoAluno = require("./routes/pagamentoaluno");
const Aluno_has_Curso = require("./routes/Aluno_has_Curso");
const Professor_has_Disciplina = require("./routes/Professor_has_Disciplina");
const Curso_has_Disciplina = require("./routes/curso_has_disciplina");
const Aluno_has_Turma = require("./routes/Aluno_has_Turma");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/", Disciplina);
app.use("/", Aluno);
app.use("/", Avaliacao);
app.use("/", Turma);
app.use("/", Curso);
app.use("/", Coordenador);
app.use("/", Pagamento);
app.use("/", TurmaCurso);
app.use("/", Professor);
app.use("/", ProfessorDisciplina);
app.use("/", Professor_has_Disciplina);
app.use("/", PagamentoAluno);
app.use("/", DisciplinaCurso);
app.use("/", Curso_has_Disciplina);
app.use("/", CoordenadorCurso);
app.use("/", AvaliacaoAluno);
app.use("/", Aluno_has_Turma);
app.use("/", Aluno_has_Curso);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  });

