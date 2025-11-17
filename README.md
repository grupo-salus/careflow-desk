# Careflow Nexus

Plataforma de service Nexus para franqueados visualizarem e gerenciarem seus chamados. Integração com API do Jira para buscar informações de tickets.

## Sobre o Projeto

O CareFlow Desk é uma aplicação web que permite aos franqueados visualizar e acompanhar seus chamados técnicos. A plataforma utiliza a API do Jira para buscar e exibir informações de tickets.

**Status atual:** Desenvolvimento de mockups para apresentação inicial.

## Instalação

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura

- `app/` - Páginas e layout principal
- `components/` - Componentes React
  - `Header.tsx` - Cabeçalho com navegação e informações do usuário
  - `Sidebar.tsx` - Barra lateral de filtros
  - `MainContent.tsx` - Conteúdo principal

