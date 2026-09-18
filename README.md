# Fortifica

Plataforma gamificada de aprendizagem sobre phishing para funcionários de
empresas. O percurso combina missões, PhishLab, simulações, Radar, Arcade,
equipes, avatar e uma casa 3D visitável.

## Aplicação publicada

Produção: <https://fortifica.fortifica-cyberraiders.workers.dev>

A aplicação roda em Cloudflare Workers e usa Cloudflare D1 para contas,
sessões, progresso e rankings.

## Desenvolvimento local

Requisitos: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Verificação

```bash
npm run build
node --test tests/rendered-html.test.mjs tests/foundation-interactions.test.mjs
```

## Publicação na Cloudflare

O arquivo `wrangler.jsonc` contém o Worker e o binding `DB`. Em uma máquina
nova, autentique a conta uma vez:

```bash
npx wrangler login
```

Quando houver uma migração nova, aplique-a antes do deploy:

```bash
npm run db:migrate:remote
```

Depois publique a versão atual:

```bash
npm run deploy:cloudflare
```

O comando gera o build Vinext e envia o artefato de produção, incluindo os
arquivos do avatar, da casa 3D e do Arcade.

## Estrutura principal

- `app/`: rotas, páginas e APIs;
- `features/`: experiências e interfaces do produto;
- `lib/`: conteúdo, regras, autenticação, estado e ranking;
- `db/` e `drizzle/`: esquema e migrações D1;
- `public/`: recursos do Arcade, avatar e casa 3D;
- `tests/`: validações de renderização e regras do percurso.
