# Desafio Fullstack Devnology

Este repositório contém a implementação da minha solução para o **teste técnico de desenvolvedor(a) fullstack** da Devnology, com foco na criação de uma plataforma de e-commerce integrada a dois fornecedores via API.

## Tecnologias Utilizadas

**Backend**:

- NestJS
- PrismaORM
- PostgreSQL
- Docker
- Swagger

**Frontend Web**:

- React
- Vite
- TypeScript
- Tailwind
- ShadcnUI

---

## Funcionalidades

- Login
- Cadastro de usuário
- Logout
- Backend unificado(NestJS)
- Integração com API dos dois fornecedores
- Autenticação de rotas em rotas privadas(frontend e backend)
- Listagem de produtos (Todos ou por ID)
- Busca de produtos
- Filtro de busca por categoria, nome, descrição, material, preço, desconto e fornecedor
- Carrinho de compras
- Finalização de compra
- Registro dos pedidos(cada usuário vê somente seus pedidos)

---

## Como rodar o projeto

### 🔹 Backend

**Requisitos**:

- Node.js (>= 16.0)
- npm (>= 8.0) ou Yarn (>= 1.22)
- Docker

---

1. **Clone o repositório:**

```bash
git clone https://github.com/IosdanFerreira/devnology-ecommerce-challenge.git

# Com o projeto aberto na IDE, acesse a pasta do backend
cd backend
```

2. **Configurar variáveis de ambiente:**

- Crie um arquivo `.env` na pasta backend
- Cole as seguintes variáveis no arquivo

```env
POSTGRES_PASSWORD=devnology-ecommerce-challenge-secret
POSTGRES_DB=devnology-ecommerce-challenge
TZ=America/Sao_Paulo
PGTZ=America/Sao_Paulo

DATABASE_URL="postgresql://postgres:devnology-ecommerce-challenge-secret@db:5432/devnology-ecommerce-challenge-db?schema=public"

JWT_SECRET="jwt_secret"

JWT_EXPIRES_IN_SECONDS=3600

JWT_EXPIRES_IN_LITERAL_STRING_VALUE='1h'

REFRESH_JWT_SECRET="refresh_jwt_secret"

REFRESH_JWT_EXPIRES_IN_SECONDS=604800

REFRESH_JWT_EXPIRES_IN_LITERAL_STRING_VALUE='7d'
```

3.  **Conceda as permissões ao aquivo entrypoint.sh:**

```bash
chmod +x .docker/entrypoint.sh
```

**Rode os comando docker:**

```bash
# Construa a build
docker compose build

#Ou caso queira limpar o cache
docker compose build --no-cache

# suba o container
 docker compose up -d
```

### Guia de uso

1.  **Acesse a aplicação:**

    Abra seu navegador e acesse `http://localhost:3000`.

2.  **Acesse a documentação do Swagger:**

    Navegue até `http://localhost:3000/docs` para acessar a documentação da API.

---

### 🔹 Frontend (React)

**Requisitos**:

- Node.js (>= 16.0)
- npm (>= 8.0) ou Yarn (>= 1.22)
- Docker

```bash
# 1. Tenha certeza de que o backend esteja rodando

# 2. Estando a na pasta root, acesse a pasta do frontend
cd frontend-web

# 3. Instale as dependências
npm install
# ou, se preferir:
yarn install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou:
yarn dev

# 5. Acesse no navegador
http://localhost:5173
```

## Decisões Técnicas

### Backend (NestJS)

- **Unificação de dados de fornecedores**: Utilizei o NestJS para consumir e consolidar os dados das duas APIs externas, padronizando os campos diferentes, mantendo a coerência dos dados.
- **Arquitetura modular**: Apliquei uma arquitetura organizada por módulos, baseada na arquitetura do próprio NestJS, facilitando a escalabilidade e manutenção, visando respeitar ao máximo princípios SOLID como o SRP.
- **Segurança e autenticação**:
  - Tokens `JWT` com suporte a refresh tokens.
  - Criptografia de senhas usando o Bcrypt
  - Armazenamento em cookies `HttpOnly` para maior segurança contra ataques XSS.
  - Uso de Strategies para capturar possíveis erros de autenticação ou validação
  - Uso de Guards e decorators para proteger rotas privadas.
  - Uso do `Helmet` para reforçar headers de segurança HTTP.
  - Aplicação do `Throttler` para limitar o número de requisições por IP e evitar ataques de força bruta (rate limiting).
- **Requisições HTTP**:
  - Todas as resposta da API(sucesso ou erro) estão padronizadas, retornando todos os dados e mensagens necessárias para o uso do frontend.
  - Centralização do tratamento de erros via `Exception Filters`, para facilitar o uso dos erros no código e padronizar os tipos erro e mensagens de erro.
  - Validação de todos os dados que são enviados nas rotas `POST`, `PUT` ou `PATCH`, utilizando DTO's, para garantir a consistência dos dados no banco
  - Todas as rotas que retornam múltiplos dados, possuem paginação integrada e padronizada.
- **Uso de imagens**:
  - Devido as imagens fornecidas pelo API externa estarem quebradas, optei por integrar o `Picsum` para substitui-las, já que cumpre o mesmo papel de gerar fotos aleatórias.
- **Persistência e ORM**:
  - Utilização do `Prisma` para interação com PostgreSQL.
  - Tipagem forte com geração automática de tipos a partir do schema Prisma.
- **Documentação da API**:
  - Swagger disponível em `/docs`, facilitando testes e entendimento da API para avaliadores e desenvolvedores.
- **Deploy local via Docker**:
  - Ambiente de desenvolvimento com `docker-compose`, incluindo PostgreSQL e aplicação NestJS prontos para uso imediato.

---

### Frontend (React)

- **Integração com o backend**:
  - O frontend consome os dados do backend unificado utilizando `axios` e `Tanstack Query`.
  - Axios configurado com interceptadores para anexar tokens e tratar erros globalmente, garantindo um fluxo contínuo de geração de tokens de acesso, até o que o refresh token fique inválido.
- **Gerenciamento de estado e autenticação**:
  - Autenticação com persistência em cookies e controle de sessão.
  - Proteção de rotas privadas com verificação de autenticação antes do acesso.
- **Interface responsiva e moderna**:
  - Estilização com Tailwind CSS e componentes acessíveis com ShadcnUI.
  - Layout mobile-first com responsividade em todas as páginas principais.
- **Busca e filtros dinâmicos**:
  - Filtros aplicáveis por nome, descrição, categoria, material, desconto, preço e fornecedor.
  - Busca com debounce para melhor desempenho.
- **Experiência do usuário**:
  - Feedback visual com loaders e mensagens de sucesso/erro.
  - Persistência do carrinho utilizando o `Zustand`.
- **Boas práticas e qualidade de código**:
  - Projeto estruturado por páginas, de forma que, tudo que for exclusivo da tela, fique na pasta dela, e fora de `pages` fica o que é global ao front.
  - Padronização de código com ESLint e Prettier.
  - Tipagem total com TypeScript.
