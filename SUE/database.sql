
CREATE TABLE `turmacurso` (
  `id_Turma` int(11) NOT NULL,
  `id_Curso` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_Turma`,`id_Curso`),
  KEY `id_Curso` (`id_Curso`),
  CONSTRAINT `turmacurso_ibfk_1` FOREIGN KEY (`id_Turma`) REFERENCES `turma` (`id_Turma`),
  CONSTRAINT `turmacurso_ibfk_2` FOREIGN KEY (`id_Curso`) REFERENCES `curso` (`id_Curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `turma` (
  `id_Turma` int(11) NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(45) DEFAULT NULL,
  `ano` varchar(45) DEFAULT NULL,
  `semestre` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_Turma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `professordisciplina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professor` int(11) NOT NULL,
  `id_disciplina` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professor` (`id_professor`),
  KEY `id_disciplina` (`id_disciplina`),
  CONSTRAINT `professordisciplina_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id_professor`),
  CONSTRAINT `professordisciplina_ibfk_2` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `professor_has_disciplina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Professor_id_Professor` int(11) NOT NULL,
  `Disciplina_id_Disciplina` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `professor` (
  `id_professor` int(11) NOT NULL AUTO_INCREMENT,
  `nome_professor` varchar(50) NOT NULL,
  `especialidade` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_professor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pagamentoaluno` (
  `id_Pagamento` int(11) NOT NULL,
  `id_Aluno` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_Pagamento`,`id_Aluno`),
  KEY `id_Aluno` (`id_Aluno`),
  CONSTRAINT `pagamentoaluno_ibfk_1` FOREIGN KEY (`id_Pagamento`) REFERENCES `pagamento` (`id_Pagamento`),
  CONSTRAINT `pagamentoaluno_ibfk_2` FOREIGN KEY (`id_Aluno`) REFERENCES `aluno` (`id_Aluno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pagamento` (
  `id_Pagamento` int(11) NOT NULL AUTO_INCREMENT,
  `nome_pagamento` varchar(255) DEFAULT NULL,
  `valor` decimal(10,0) DEFAULT NULL,
  `data_pay` datetime DEFAULT NULL,
  `taxa` decimal(10,0) DEFAULT NULL,
  `desconto` decimal(10,0) DEFAULT NULL,
  `Valor_Total` int(11) DEFAULT NULL,
  `id_Aluno` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_Pagamento`),
  KEY `id_Aluno` (`id_Aluno`),
  CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`id_Aluno`) REFERENCES `aluno` (`id_Aluno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `disciplina` (
  `id_disciplina` int(11) NOT NULL AUTO_INCREMENT,
  `nome_disciplina` varchar(50) NOT NULL,
  `carga_horaria` int(11) NOT NULL,
  `descricao_disciplina` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_disciplina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `disciplinacurso` (
  `id_disciplina` int(11) NOT NULL,
  `id_Curso` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_disciplina`,`id_Curso`),
  KEY `id_Curso` (`id_Curso`),
  CONSTRAINT `disciplinacurso_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`),
  CONSTRAINT `disciplinacurso_ibfk_2` FOREIGN KEY (`id_Curso`) REFERENCES `curso` (`id_Curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `curso_has_disciplina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Curso_id_Curso` int(11) NOT NULL,
  `Disciplina_id_Disciplina` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `curso` (
  `id_Curso` int(11) NOT NULL AUTO_INCREMENT,
  `nome_curso` varchar(50) NOT NULL,
  `duracao` decimal(65,0) NOT NULL,
  `valor` decimal(65,2) NOT NULL,
  `id_Coordenador` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_Curso`),
  KEY `id_Coordenador` (`id_Coordenador`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`id_Coordenador`) REFERENCES `coordenador` (`id_Coordenador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `coordenadorcurso` (
  `id_Coordenador` int(11) NOT NULL,
  `id_Curso` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_Coordenador`,`id_Curso`),
  KEY `id_Curso` (`id_Curso`),
  CONSTRAINT `coordenadorcurso_ibfk_1` FOREIGN KEY (`id_Coordenador`) REFERENCES `coordenador` (`id_Coordenador`),
  CONSTRAINT `coordenadorcurso_ibfk_2` FOREIGN KEY (`id_Curso`) REFERENCES `curso` (`id_Curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `coordenador` (
  `id_Coordenador` int(11) NOT NULL AUTO_INCREMENT,
  `nome_coordenador` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_Coordenador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `avaliacaoaluno` (
  `id_Avaliacao` int(11) NOT NULL,
  `id_Aluno` int(11) NOT NULL,
  PRIMARY KEY (`id_Avaliacao`,`id_Aluno`),
  KEY `id_Aluno` (`id_Aluno`),
  CONSTRAINT `avaliacaoaluno_ibfk_1` FOREIGN KEY (`id_Avaliacao`) REFERENCES `avaliacao` (`id_Avaliacao`),
  CONSTRAINT `avaliacaoaluno_ibfk_2` FOREIGN KEY (`id_Aluno`) REFERENCES `aluno` (`id_Aluno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `avaliacao` (
  `id_Avaliacao` int(11) NOT NULL AUTO_INCREMENT,
  `nome_avaliacao` varchar(60) DEFAULT NULL,
  `valor` decimal(10,0) DEFAULT NULL,
  `dataa` datetime DEFAULT NULL,
  PRIMARY KEY (`id_Avaliacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `aluno_has_turma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Aluno_id_Aluno` int(11) NOT NULL,
  `Turma_id_Turma` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Aluno_id_Aluno` (`Aluno_id_Aluno`),
  KEY `Turma_id_Turma` (`Turma_id_Turma`),
  CONSTRAINT `aluno_has_turma_ibfk_1` FOREIGN KEY (`Aluno_id_Aluno`) REFERENCES `aluno` (`id_Aluno`),
  CONSTRAINT `aluno_has_turma_ibfk_2` FOREIGN KEY (`Turma_id_Turma`) REFERENCES `turma` (`id_Turma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `aluno_has_curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Aluno_id_Aluno` int(11) NOT NULL,
  `Curso_id_Curso` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Aluno_id_Aluno` (`Aluno_id_Aluno`),
  KEY `Curso_id_Curso` (`Curso_id_Curso`),
  CONSTRAINT `aluno_has_curso_ibfk_1` FOREIGN KEY (`Aluno_id_Aluno`) REFERENCES `aluno` (`id_Aluno`),
  CONSTRAINT `aluno_has_curso_ibfk_2` FOREIGN KEY (`Curso_id_Curso`) REFERENCES `curso` (`id_Curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `aluno` (
  `id_Aluno` int(11) NOT NULL AUTO_INCREMENT,
  `nome_aluno` varchar(45) DEFAULT NULL,
  `Num_Matricula` decimal(10,0) DEFAULT NULL,
  `Estado_Matricula` varchar(45) NOT NULL,
  PRIMARY KEY (`id_Aluno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
