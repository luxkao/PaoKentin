# Projeto PãoKentin

PãoKentin é um sistema web full-stack desenvolvido como projeto final para a disciplina de Desenvolvimento Web 2. A aplicação simula um sistema de gerenciamento de fornadas para uma padaria, permitindo que os donos cadastrem tipos de pães, os padeiros registrem o início de novas fornadas e os clientes visualizem o status dos pães em tempo real.

O projeto foi construído utilizando uma API RESTful em Spring Boot com Java e JDBC no backend, e uma interface reativa e moderna em React com TypeScript no frontend.

---
## Funcionalidades Implementadas

O sistema é dividido em três perspectivas principais:

1. **Visão do Dono da Padaria**

-  **Cadastro de Pães:** Permite cadastrar novos tipos de pão, especificando nome, descrição, tempo de preparo e uma cor associada para a interface.

-  **Listagem de Pães:** Visualiza todos os pães já cadastrados no sistema.

-  **CRUD Completo:** A interface oferece funcionalidade completa para Criar, Ler, Atualizar e Deletar os tipos de pão.

2. **Visão do Padeiro**

-  **Dashboard de Ação Rápida:** Exibe botões grandes e coloridos para cada tipo de pão cadastrado.

-  **Registro de Fornada:** Com um único clique em um dos botões, o padeiro registra no sistema o momento exato em que uma nova fornada de um determinado pão foi para o forno.

-  **Feedback Visual:** O sistema fornece uma confirmação imediata ao padeiro de que a fornada foi iniciada com sucesso.

3. **Visão do Cliente**

-  **Status em Tempo Real:** Exibe o status da última fornada de cada tipo de pão.

-  **Atualização Automática:** A página se atualiza automaticamente a cada 10 segundos, buscando novas informações da API sem a necessidade de recarregar a página.

-  **Contador Regressivo:** Para pães que estão no status "Assando", um contador mostra em tempo real (atualizado a cada segundo) quanto tempo falta para a fornada ficar pronta.
---

## Tecnologias Utilizadas

| Camada | Tecnologia/Ferramenta | Descrição |
| ----------- | ---------- | ----------- |
| Backend | Java 17 | Linguagem de programação principal. |
|  | Spring Boot | Framework para criação da API RESTful. |
|  | JDBC API | Para comunicação com o banco de dados sem ORM. |
|  | Maven | Gerenciador de dependências e build do projeto. |
| Frontend | React | Biblioteca para construção da interface de usuário. |
|  | TypeScript | Superset do JavaScript que adiciona tipagem estática. |
|  | Vite | Ferramenta de build e servidor de desenvolvimento. |
|  | Axios | Cliente HTTP para consumir a API do backend. |
|  | Tailwind CSS | Framework CSS para estilização rápida e utilitária. |
| Banco de Dados | MySQL 8.0 | Sistema de gerenciamento de banco de dados relacional. |
| Ambiente | Docker | Para containerização do banco de dados MySQL. |
---

## Pré-requisitos para Execução

- JDK 17 (ou superior)

- Node.js v18 (ou superior)

- Docker
---

## Estrutura do Projeto

O projeto está organizado em um monorepo, contendo as duas aplicações (backend e frontend) em um único repositório Git.
```
PaoKentin/
├── backend/      # Contém a aplicação Spring Boot (API)
└── frontend/     # Contém a aplicação React (Interface do Usuário)
```

---

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/luxkao/PaoKentin.git
    cd PaoKentin
    ```

2.  **Configurar e Iniciar o Banco de Dados (Docker):**
    O banco de dados MySQL é executado em um container Docker. Para iniciá-lo, execute o seguinte comando na raiz do projeto:
    ```bash
    docker run -d --name paokentin-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=paokentin_db mysql:8.0
    ```
3.  **Crie as Tabelas:**
    Conecte-se ao banco de dados `paokentin_db` (usando um cliente como DBeaver, MySQL Workbench, etc.) e execute o script encontrado em `PaoKentin/backend/src/main/resources/sql/schema.sql` para criar todas as tabelas necessárias.

4.  **Executar o Backend (API Spring Boot):**
    Navegue até a pasta do backend e utilize o Maven Wrapper para iniciar a aplicação.
    ```bash
    cd backend
    mvn spring-boot:run
    ```

5.  **Executar o Frontend (Aplicação React):**
    Abra um novo terminal na raiz do projeto, navegue até a pasta do frontend, instale as dependências e inicie o servidor de desenvolvimento.
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    A aplicação frontend estará disponível em http://localhost:5173 (ou outra porta indicada pelo Vite).
---