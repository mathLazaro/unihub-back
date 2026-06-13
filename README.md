# UniHub Back

Backend da aplicação UniHub desenvolvido com NestJS, TypeORM e PostgreSQL.

## Visão geral

O projeto está organizado por módulos de domínio:

- `src/modules/auth`: autenticação, login e JWT.
- `src/modules/users`: cadastro e consulta de usuários.
- `src/modules/posts`: criação e consulta de posts.
- `src/shared`: componentes reutilizáveis como `base.entity`, `base.repository`, guards e decorators.
- `src/config`: configurações centralizadas de banco de dados e JWT.

## Estrutura de pastas

```text
src/
  app.module.ts            # módulo principal da aplicação
  main.ts                  # bootstrap da API e configuração do Swagger
  config/                  # configurações de banco e JWT
  modules/                 # módulos de negócio da aplicação
  shared/                  # recursos compartilhados entre módulos
```

## Requisitos

- Node.js instalado
- PostgreSQL disponível localmente ou via Docker
- npm

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto.

Variáveis usadas pela aplicação:

- `PORT`: porta da API. Padrão `3000`.
- `DB_HOST`: host do banco. Padrão `localhost`.
- `DB_PORT`: porta do banco. Padrão `5433`.
- `DB_USERNAME`: usuário do banco. Padrão `postgres`.
- `DB_PASSWORD`: senha do banco. Padrão `postgres`.
- `DB_NAME`: nome do banco. Padrão `unihub_db`.
- `JWT_SECRET`: segredo usado para gerar e validar JWT. Obrigatório para autenticação.

Exemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=unihub_db
JWT_SECRET=your-secret-here
```

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Suba o banco de dados com Docker Compose ou configure um PostgreSQL local.

3. Inicie a aplicação em modo desenvolvimento:

```bash
npm run start:dev
```

4. A API ficará disponível na porta configurada em `PORT` ou, por padrão, em `3000`.

## Swagger

A documentação interativa da API fica em:

```text
/swagger
```

Exemplo completo:

```text
http://localhost:3000/swagger
```

O Swagger já inclui autenticação via Bearer token JWT.

## Docker Compose para desenvolvimento

O arquivo `docker-compose.yml` sobe apenas os serviços de apoio ao desenvolvimento:

- PostgreSQL na porta `5433`
- pgAdmin na porta `5050`

A partir da pasta `./docker`, suba os serviços com:

```bash
docker compose up -d
```

Se preferir subir apenas o banco e o pgAdmin:

```bash
docker compose up -d postgres pgadmin
```

### Acesso aos serviços

- PostgreSQL: `localhost:5433`
- pgAdmin: `http://localhost:5050`

Credenciais padrão do compose:

- PostgreSQL: `postgres / postgres`
- Banco: `unihub_db`
- pgAdmin: `admin@admin.com / admin`

## Scripts úteis

- `npm run start:dev`: inicia a API em modo watch.
- `npm run build`: gera a build da aplicação.
- `npm run start:prod`: executa a build compilada.
- `npm run test`: executa os testes unitários.
- `npm run test:e2e`: executa os testes end-to-end.
- `npm run lint`: valida e corrige o código com ESLint.
- `npm run format`: formata os arquivos TypeScript com Prettier.

## Observações

- O TypeORM está configurado com `synchronize: true`, então o schema é ajustado automaticamente em ambiente de desenvolvimento.
- As entidades são carregadas automaticamente com `autoLoadEntities: true`.
- As rotas de negócio não são detalhadas aqui porque ficam documentadas no Swagger.
