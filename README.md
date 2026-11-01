# pgats-automacao-web

Suite de testes E2E de exemplo utilizando [Cypress](https://www.cypress.io/), cobrindo os principais fluxos do site [Automation Exercise](https://www.automationexercise.com).

## Pré-requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
```

## Executando os testes

**Modo interativo (Cypress App):**

```bash
npm test
```

**Modo headless (CI):**

```bash
npm run test:ci
```

## Estrutura do projeto

```
cypress/
├── e2e/                  # Specs (cenários de teste)
├── fixtures/             # Dados de teste em JSON
├── modules/              # Ações de negócio por funcionalidade
│   ├── cadastro/
│   ├── conta/
│   ├── login/
│   ├── pedido/
│   ├── produtos/
│   └── assinatura/
└── support/              # Configuração global e comandos customizados
```

## Pipeline CI

A pipeline no GitHub Actions é acionada manualmente via **workflow_dispatch**.  
Ao final da execução, screenshots e vídeos ficam disponíveis como artefatos na aba Actions.

## Casos de teste cobertos

| # | Descrição |
|---|-----------|
| TC1 | Cadastrar novo usuário com sucesso |
| TC2 | Login com email e senha corretos |
| TC3 | Login com email e senha incorretos |
| TC4 | Logout de usuário |
| TC5 | Cadastro com e-mail já existente |
| TC8 | Verificar produtos e página de detalhes |
| TC9 | Buscar produto |
| TC10 | Assinatura na página inicial |
| TC15 | Realizar pedido após cadastro |
| TC16 | Realizar pedido após login |
