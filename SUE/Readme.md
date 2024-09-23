
<body>
    <div class="container">
        <h1>SUE - Manutenção do Back End</h1>
        <p>Este projeto tem como objetivo manter e melhorar o back end de um sistema utilizando Sequelize para interação com o banco de dados. O foco principal foi a reestruturação do código, correções e a criação de rotas para todas as tabelas do banco.</p>
        <h2>Objetivo 🎯</h2>
        <p>O principal objetivo deste projeto é aprimorar a estrutura existente do back end, garantindo que o código esteja mais organizado e eficiente. As melhorias visam facilitar a manutenção futura e oferecer um CRUD completo para todas as tabelas do banco de dados.</p>
        <h2>Melhorias e Correções 🛠️</h2>
        <ul>
            <li><strong>Padronização dos modelos Sequelize</strong>: Todos os modelos foram transformados em constantes, melhorando a legibilidade e a manutenção do código.</li>
            <li><strong>Atualização de erros ortográficos</strong>: Correção de erros nos nomes das tabelas do banco de dados.</li>
            <li><strong>Criação da pasta <code>routes</code></strong>: Organizando as rotas do projeto.</li>
            <li><strong>Implementação de CRUD</strong>: Todas as tabelas do banco agora possuem operações CRUD implementadas dentro da pasta <code>routes</code>.</li>
            <li><strong>Reestruturação do <code>index</code></strong>: Melhorias na estrutura do arquivo de entrada do projeto.</li>
            <li><strong>Atualização das dependências</strong>: As bibliotecas utilizadas foram atualizadas para suas versões mais recentes.</li>
            <li><strong>Remoção das <code>View.ejs</code></strong>: As views foram removidas e um backup foi efetuado para garantir a segurança dos dados.</li>
        </ul>
        <h2>Estrutura do Projeto</h2>
        <pre><code>
/SUE
│
├── /routes                     Diretório onde as rotas CRUD estão implementadas
│
├── index.js                    Arquivo principal que inicia a aplicação
│
└── /config                     Arquivos Sequelize
        </code></pre>
        <h2>Como Funciona ⚙️</h2>
        <ol>
            <li><strong>Conexão com o Banco de Dados</strong>: O projeto utiliza Sequelize para se conectar ao banco de dados e realizar operações CRUD nas tabelas.</li>
            <li><strong>Rotas CRUD</strong>: Cada tabela do banco possui rotas específicas que permitem operações de Create, Read, Update e Delete.</li>
            <li><strong>Modelos Padronizados</strong>: Os modelos Sequelize são definidos como constantes, melhorando a clareza e a manutenção do código.</li>
        </ol>
        <h2>Pré-requisitos ⚙️</h2>
        <h3>Dependências Node.js:</h3>
        <p>Para que o projeto funcione corretamente, você precisará instalar as seguintes dependências:</p>
        <pre><code>npm install sequelize mysql2</code></pre>
        <h2>Configuração 🔧</h2>
        <p>No arquivo <code>database.js</code>, ajuste a URL de conexão com o banco de dados para corresponder às suas credenciais:</p>
        <pre><code>
const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
    host: 'host',
    dialect: 'mysql',
});
        </code></pre>
        <p>Substitua <code>usuario</code>, <code>senha</code>, <code>host</code> e <code>nome_do_banco</code> pelos valores corretos do seu banco de dados.</p>
        <h2>Como Rodar 🚀</h2>
        <ol>
            <li>Certifique-se de que as dependências Node.js estão instaladas.</li>
            <li>Execute o arquivo <code>index.js</code>:</li>
        </ol>
        <pre><code>node index.js</code></pre>
        <p>O servidor será iniciado e você poderá acessar as rotas CRUD implementadas.</p>
        <h2>Testes 🧪</h2>
        <p>Para testar o projeto e garantir que as rotas estão funcionando corretamente:</p>
        <ol>
            <li>Verifique se o banco de dados está acessível e que as credenciais no arquivo <code>database.js</code> estão corretas.</li>
            <li>Acesse as rotas via um cliente HTTP (como Postman) e realize operações CRUD nas tabelas.</li>
        </ol>
        <h2>Contribuições 🤝</h2>
        <p>Contribuições são bem-vindas! Se você tem sugestões ou melhorias, sinta-se à vontade para abrir um issue ou um pull request.</p>
    </div>
</body>
