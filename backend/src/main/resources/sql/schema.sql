-- Cria o banco de dados caso ele ainda não exista.
CREATE DATABASE IF NOT EXISTS paokentin_db;

-- Seleciona o banco de dados para os comandos seguintes.
USE paokentin_db;

-- Tabela para armazenar os tipos de pão.
CREATE TABLE pao (
                     id INT PRIMARY KEY AUTO_INCREMENT,
                     nome VARCHAR(100) NOT NULL,
                     descricao TEXT NOT NULL,
                     tempo_preparo_minutos INT NOT NULL,
                     cor_hex VARCHAR(7) NOT NULL
);

-- Tabela para registrar as fornadas de cada pão.
CREATE TABLE fornada (
                         id INT PRIMARY KEY AUTO_INCREMENT,
                         id_pao INT NOT NULL,
                         data_hora_inicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (id_pao) REFERENCES pao(id)
);