# Adote Hoje - Bootcamp Avanti Desenvolvimento Full-stack 2025.3

Este é um projeto de API REST desenvolvido em Node.js para um sistema de adoção de pets. O projeto faz parte do Bootcamp da Avanti e permite gerenciar pets, adotantes, adoções e usuários com autenticação e autorização.

## Funcionalidades

- Gerenciamento de pets (CRUD)
- Gerenciamento de adotantes (CRUD)
- Gerenciamento de adoções (CRUD)
- Sistema de usuários com autenticação JWT
- Autorização baseada em roles (admin/normal)

## Tecnologias Utilizadas

- **Node.js** com **Express.js** para o servidor
- **Prisma** como ORM para PostgreSQL
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **PostgreSQL** como banco de dados

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd adocao_de_pets
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

1. Crie um banco de dados PostgreSQL para o projeto.

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
   JWT_SECRET="sua_chave_secreta_jwt"
   ```

   - Substitua `usuario`, `senha`, `localhost`, `5432` e `nome_do_banco` pelas configurações do seu banco PostgreSQL.
   - Escolha uma chave secreta forte para `JWT_SECRET`.

3. Execute as migrações do Prisma para criar as tabelas no banco:
   ```bash
   npx prisma migrate deploy
   ```

4. (Opcional) Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```

## Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm start
```

O servidor será executado na porta 8080. Você pode acessar a API em `http://localhost:8080`.

## Endpoints da API

### Autenticação
- `POST /login` - Login de usuário (público)

### Pets
- `GET /pet` - Listar todos os pets (requer autenticação)
- `POST /pet` - Criar novo pet (requer autenticação)
- `PUT /pet/:id_pet` - Atualizar pet (requer autorização admin)
- `DELETE /pet/:id_pet` - Deletar pet (requer autorização admin)

### Adotantes
- `GET /adotante` - Listar todos os adotantes (requer autenticação)
- `POST /adotante` - Criar novo adotante (requer autenticação)
- `PUT /adotante/:id_adotante` - Atualizar adotante (requer autorização admin)
- `DELETE /adotante/:id_adotante` - Deletar adotante (requer autorização admin)

### Adoções
- `GET /adocao` - Listar todas as adoções (requer autenticação)
- `POST /adocao` - Criar nova adoção (requer autenticação)
- `PUT /adocao/:id_adocoes` - Atualizar adoção (requer autorização admin)
- `DELETE /adocao/:id_adocoes` - Deletar adoção (requer autorização admin)

### Usuários
- `GET /user` - Listar todos os usuários (requer autorização admin)
- `POST /user` - Criar novo usuário (público)
- `PUT /user/:id_user` - Atualizar usuário (requer autorização admin)
- `DELETE /user/:id_user` - Deletar usuário (requer autorização admin)

## Estrutura do Projeto

```
src/
├── controllers/     # Controladores da API
├── database/        # Configuração do banco de dados
├── middleware/      # Middlewares de autenticação e autorização
├── routes/          # Definição das rotas
└── server.js        # Arquivo principal do servidor

prisma/
├── schema.prisma    # Esquema do banco de dados
└── migrations/      # Migrações do Prisma
```

## Contribuição

Squad 6

- Patrick Santos: Desenvolvimento do BackEnd e do Banco de Dados
- Marcelo Motta: Ausente devido a questões pessoais
- Cesar Carvalho: Ausente
- Moisés Dcf: Ausente
- Réges: Ausente
- Jeannine Araújo: Ausente

## Autor

Patrick Santos da Silva
