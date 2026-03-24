# Migração de Prisma para Drizzle ORM

## Resumo da Migração

Este projeto foi migrado com sucesso do **Prisma ORM** para **Drizzle ORM**. A migração inclui:

### ✅ Componentes Migrados

1. **Schema de Banco de Dados**
   - Arquivo: `/src/lib/db/schema.ts`
   - Define todos os models: `Post`, `InstaPostsData`, `TokenData`, `CurrentUser`
   - Tipos TypeScript gerados automaticamente

2. **Configuração de Conexão**
   - Arquivo: `/src/lib/db/index.ts`
   - Singleton pattern para reutilização de conexão
   - Suporta `PGVERCEL_URL` ou `DATABASE_URL`

3. **Arquivos de Ação Migrados**
   - `src/common/actions/ig/igTokenManager.ts` - Gerenciamento de tokens
   - `src/common/actions/ig/igProfileManager.ts` - Gerenciamento de perfil
   - `src/common/actions/ig/igProfilePostsManager.ts` - Gerenciamento de posts
   - `src/app/api/instaData/authorize/[...slug]/route.ts` - Rota de autorização

### 📦 Dependências

**Adicionadas:**
- `drizzle-orm` - ORM
- `pg` - Driver PostgreSQL
- `drizzle-kit` (dev) - Ferramentas CLI

**Removidas:**
- `@prisma/client`
- `prisma`

## Como Usar

### Criar/Atualizar Banco de Dados

```bash
# Gerar migrations do schema
pnpm db:generate

# Executar push de changes
pnpm db:push

# Abrir Drizzle Studio para ver dados
pnpm db:studio
```

### Exemplo de Query

**Antes (Prisma):**
```typescript
const prisma = new PrismaClient();
const token = await prisma.tokenData.findUnique({
  where: { id: 1 }
});
```

**Depois (Drizzle):**
```typescript
import { database, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

const token = await database
  .select()
  .from(schema.tokenData)
  .where(eq(schema.tokenData.id, 1));
```

### Exemplo de Upsert

**Antes (Prisma):**
```typescript
await prisma.tokenData.upsert({
  where: { id: 1 },
  create: { id: 1, ...data },
  update: { ...data }
});
```

**Depois (Drizzle):**
```typescript
const existing = await database
  .select()
  .from(schema.tokenData)
  .where(eq(schema.tokenData.id, 1));

if (existing.length > 0) {
  await database
    .update(schema.tokenData)
    .set(data)
    .where(eq(schema.tokenData.id, 1))
    .returning();
} else {
  await database
    .insert(schema.tokenData)
    .values({ id: 1, ...data })
    .returning();
}
```

## Estrutura de Arquivos

```
src/lib/db/
├── index.ts           # Exporta database e schema
├── schema.ts          # Definição de tabelas e tipos
└── migrations/
    └── 0001_initial.sql  # Migration SQL inicial
```

## Variáveis de Ambiente

A aplicação procura por (nesta ordem):
1. `PGVERCEL_URL` - Connection string para Vercel Postgres
2. `DATABASE_URL` - Connection string padrão

Exemplo `.env.local`:
```
PGVERCEL_URL=postgres://user:password@host:port/database
# ou
DATABASE_URL=postgres://user:password@host:port/database
```

## Notas Importantes

- Todas as queries agora usam `database` singleton para evitar múltiplas conexões
- Não há mais necessidade de chamar `.disconnect()` manualmente
- Os tipos são inferidos do schema, garantindo type-safety
- As migrations podem ser executadas diretamente em SQL se necessário

## Troubleshooting

**Erro: "DATABASE_URL or PGVERCEL_URL environment variable is not set"**
- Configure as variáveis de ambiente de desenvolvimento

**Erro ao executar db:generate**
- Certifique-se de que `drizzle.config.ts` está configurado corretamente
- Verifique que as variáveis de ambiente estão definidas

## Referências

- [Documentação Drizzle ORM](https://orm.drizzle.team)
- [PostgreSQL com Drizzle](https://orm.drizzle.team/docs/get-started-postgresql)
- [Composição de Queries](https://orm.drizzle.team/docs/select)
