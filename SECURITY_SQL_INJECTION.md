# Auditoria de Segurança: Defesa contra SQL Injection 🛡️

Este documento serve como comprovação e guia explicativo de como a arquitetura do backend deste projeto (UniHub) está protegida contra ataques de **SQL Injection**, uma das vulnerabilidades web mais comuns e perigosas da atualidade.

## O que é SQL Injection?
É um ataque que consiste na inserção (injeção) de uma query SQL maliciosa por meio dos dados de entrada do cliente para a aplicação. Um atacante poderia usar o campo de login ou de busca para tentar enviar comandos como `DROP TABLE users;` ou `OR 1=1` para burlar a autenticação.

---

## Como nosso projeto está protegido?

Após uma varredura completa na camada de repositórios da aplicação (`unihub-back/src/modules/*/repositories`), confirmamos que a arquitetura adotou as melhores práticas do mercado, impedindo a ocorrência dessas falhas. O projeto está blindado através de dois pilares:

### 1. Uso Estrito do ORM (TypeORM)
Em vez de construir e concatenar strings de queries SQL manualmente, a aplicação interage com o banco de dados (Postgres) exclusivamente através de métodos abstraídos pelo TypeORM, como `.save()`, `.findAndCount()`, `.findOneBy()`, e `.delete()`.

**Por que isso protege?**
O ORM abstrai a criação da query. Quando chamamos `this.repository.findOneBy({ email: userInput })`, o TypeORM converte isso automaticamente no que chamamos de **Prepared Statement** (Instrução Preparada). 

### 2. Prepared Statements (Instruções Preparadas)
Onde houve a necessidade de criar queries mais complexas usando o `QueryBuilder`, o padrão de parametrização foi respeitado.

**Exemplo real no nosso código (`user.repository.ts`):**
```typescript
async findAllUsersToNotificate(postType: PostType): Promise<User[]> {
    return await this.repository
        .createQueryBuilder('user')
        // Correto: Uso de placeholder (:) e objeto de parâmetro
        .where(':postType = ANY(user.subscribedTypes)', { postType })
        .getMany();
}
```

**Como funciona a proteção na prática:**
Se tentássemos concatenar a string (ex: `.where(postType + ' = ANY(...)')`), estaríamos vulneráveis. 
No entanto, ao utilizar `:postType` e passar `{ postType }` separadamente, o framework avisa o driver do banco de dados: *"Aqui está o molde da query, e aqui está o dado em formato puro"*. O banco de dados analisa, compila o molde da query **antes** de receber o valor. Quando o valor entra, o banco o trata estritamente como um literal (uma string inofensiva), impossibilitando que qualquer trecho do valor seja executado como um comando SQL, por mais malicioso que seja.

---

## Conclusão

Não existem queries `.query(rawSql)` rodando soltas no código e nenhuma concatenação de string não-sanitizada. Por design e pela escolha de tecnologias (NestJS + TypeORM), o banco de dados da aplicação está hermeticamente selado contra ataques de SQL Injection convencionais.
