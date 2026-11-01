# Diretrizes de Modularização e Arquitetura dos Testes Cypress

---

## Contexto

Este projeto utiliza Cypress para automação de testes E2E.

Os testes devem ser modularizados de forma a separar claramente:

- Cenários e comportamento dos testes (spec);
- Ações de negócio da aplicação;
- Seletores dos elementos;
- Asserções;
- Dados utilizados nos cenários.

O objetivo é reduzir duplicação, facilitar manutenção e tornar as specs mais legíveis e orientadas ao comportamento do usuário.

---

## Arquitetura Adotada

A arquitetura é baseada em **módulos de Ações de Negócio**.

Os módulos dedicados devem ser armazenados na pasta `modules/`, organizados por funcionalidade:

```
modules/
├── home/
│   └── index.js
├── login/
│   └── index.js
├── cadastro/
│   └── index.js
├── conta/
│   └── index.js
├── produtos/
│   └── index.js
├── pedido/
    └── index.js
```

Cada módulo deve representar um contexto de negócio isolado. Comportamentos que pertencem à página inicial (verificar carregamento, assinatura, rodapé) devem ficar no módulo `home`, não espalhados por módulos funcionais.

**Não utilizar a nomenclatura:** `Pages`, `Page Objects`, `PageObject`, `*Page.js` ou classes representando páginas.

Em vez disso, utilizar módulos que representem contextos, funcionalidades ou ações de negócio.

---

## Módulos

Os módulos devem utilizar **funções e `module.exports`**, evitando classes.

Cada módulo deve concentrar as funções relacionadas a um determinado contexto ou comportamento de negócio.

**Exemplo:**

```js
const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErro: 'form[action*="login"] > p'
}

const mensagens = {
  tituloLogin: 'Login to your account',
  erroCredenciais: 'Your email or password is incorrect!',
}

function acessarLogin() {
  cy.visit('/login')
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
  cy.get(seletores.botaoEntrar).click()
}

module.exports = {
  acessarLogin,
  efetuarLogin
}
```

---

## Seletores

Os seletores devem ficar **fora da spec** e próximos das funções de Ação de Negócio que os utilizam.

O grupo de seletores de um módulo deve ser armazenado em uma constante chamada **`seletores`**:

```js
const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]'
}
```

**Não utilizar nomes genéricos ou variantes** como `elements`, `elementos`, `selectors` ou `campos`. O nome padrão do projeto é `const seletores = {}`.

## Mensagens

Textos literais esperados nas asserções (labels, mensagens de erro, títulos de página) devem ser centralizados em uma constante chamada **`mensagens`** dentro do módulo correspondente:

```js
const mensagens = {
  tituloLogin: 'Login to your account',
  erroCredenciais: 'Your email or password is incorrect!',
}
```

Isso evita strings espalhadas pelas funções de validação, facilita manutenção quando o texto da aplicação muda e torna as asserções mais legíveis.

**Não utilizar variantes** como `texts`, `labels`, `strings` ou `conteudo`. O nome padrão do projeto é `const mensagens = {}`.

A spec **não deve conhecer** diretamente os seletores da aplicação. A interação deve ser encapsulada pelas Ações de Negócio.

**Evitar na spec:**

```js
cy.get('[data-qa="login-email"]');
cy.get('[data-qa="login-password"]');
cy.get('[data-qa="login-button"]');
```

---

## Granularidade das Funções

As funções devem possuir granularidade **orientada à ação de negócio**, podendo agrupar várias interações relacionadas.

Não é necessário criar uma função para cada interação individual. Por exemplo, em vez de:

```js
informarNome();
informarEmail();
informarSenha();
selecionarPais();
clicarCadastrar();
```

Prefira uma função coesa que agrupe as operações:

```js
function preencherDadosDoUsuario(usuario) {
  cy.get(seletores.nome).type(usuario.nome)
  cy.get(seletores.email).type(usuario.email)
  cy.get(seletores.senha).type(usuario.senha)
  cy.get(seletores.pais).select(usuario.pais)
}

function cadastrarUsuario(usuario) {
  preencherDadosDoUsuario(usuario)
  cy.get(seletores.botaoCadastrar).click()
}
```

### Critérios para definir a granularidade:

- Reutilização;
- Clareza da spec;
- Coesão da ação;
- Complexidade do fluxo;
- Facilidade de manutenção.

**Evitar** funções excessivamente pequenas (encapsulam um único `cy.get()`) e funções excessivamente grandes (executam fluxos não relacionados).

> **Regra:** Uma função deve representar uma ação ou conjunto coeso de interações que faça sentido no contexto do negócio.

---

## Asserções

As asserções devem estar **sempre nos módulos** de Ações de Negócio. As specs **não devem conter asserções diretamente**.

**Evitar:**

```js
login.efetuarLogin(email, senha);

cy.get('.navbar-nav li')
  .contains('PGATS Aut')
  .should('be.visible');
```

**Preferir:**

```js
login.efetuarLogin(email, senha);
login.validarUsuarioAutenticado('PGATS Aut');
```

O módulo é responsável tanto pela interação quanto pela validação relacionada àquele contexto:

```js
function validarUsuarioAutenticado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .contains(nome)
    .should('be.visible')
}
```

As funções de validação devem utilizar nomenclatura em Português do Brasil e representar o comportamento validado:

```js
validarUsuarioAutenticado();
validarMensagemDeErro();
validarFormularioVisivel();
validarEmailObrigatorio();
validarCadastroRealizado();
```

---

## Nomenclatura das Funções

As funções devem utilizar **Português do Brasil** e representar ações ou comportamentos de negócio.

**Preferir:**

```js
acessarLogin();
efetuarLogin();
cadastrarUsuario();
validarUsuarioAutenticado();
efetuarLogout();
preencherDadosDoUsuario();
validarMensagemDeErro();
```

**Evitar:**

```js
login();
createUser();
clickLogin();
fillEmail();
assertUser();
```

A função deve representar **o que o usuário ou o negócio está fazendo**, não a operação técnica do Cypress.

### Exemplos práticos

**Preferir:**
```js
login.efetuarLogin(email, senha);
cadastro.cadastrarUsuario(usuario);
```

**Evitar:**
```js
login.informarEmail(email);
login.informarSenha(senha);
login.clicarBotaoEntrar();

cadastro.informarNome(nome);
cadastro.informarEmail(email);
cadastro.informarSenha(senha);
cadastro.clicarCadastrar();
```

Operações menores podem existir **internamente no módulo** para organização e reutilização, sem necessariamente serem exportadas.

---

## Responsabilidade da Spec

A spec deve descrever o cenário de forma clara e próxima da linguagem dos requisitos.

**Exemplo:**

```js
const login = require('../modules/login/index')

describe('Login de usuário', () => {
  it('deve efetuar login com email e senha corretos', () => {
    login.acessarLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    login.validarUsuarioAutenticado(usuario.nome)
  })
})
```

### A spec é responsável por:

- Organizar os cenários;
- Definir os dados utilizados no cenário;
- Orquestrar as Ações de Negócio na ordem necessária.

### A spec **não** é responsável por:

- Conhecer seletores;
- Interagir diretamente com elementos da aplicação;
- Implementar regras de interação;
- Realizar asserções;
- Repetir fluxos de negócio;
- Implementar detalhes técnicos de resolução de comandos assíncronos.

---

## Tratamento de Promises e Comandos Assíncronos

O Cypress possui uma cadeia própria de comandos assíncronos. Deve-se evitar aninhamento excessivo de callbacks, `then()` ou outras estruturas utilizadas apenas para acessar valores retornados por comandos anteriores.

**Evitar estruturas excessivamente aninhadas:**

```js
cy.url().then((primeiraUrl) => {
  cy.get('body').then(($primeiroBody) => {
    const primeiroConteudo = $primeiroBody.text();

    login.acessarLogin();

    cy.url().then((segundaUrl) => {
      cy.get('body').then(($segundoBody) => {
        const segundoConteudo = $segundoBody.text();

        expect(segundaUrl).to.equal(primeiraUrl);
        expect(segundoConteudo).to.equal(primeiroConteudo);
      });
    });
  });
});
```

Quando uma comparação exigir valores anteriores, os valores podem ser capturados em variáveis de forma controlada, ou a responsabilidade pode ser encapsulada em uma Ação de Negócio.

### Prioridade ao escrever testes:

1. Legibilidade;
2. Manutenibilidade;
3. Clareza do comportamento testado;
4. Apenas depois, a menor quantidade possível de linhas.

> **Regra:** Evitar aninhamento de código sempre que ele não agregar clareza ao cenário.

---

## Dados de Teste

Dados de teste devem ser mantidos **separados** da implementação das Ações de Negócio.

Utilizar fixtures ou outra estrutura apropriada para dados reutilizáveis:

```
fixtures/
└── usuarios.json
```

```json
{
  "usuarioValido": {
    "nome": "PGATS Aut",
    "email": "teste@mail.com",
    "senha": "12345"
  }
}
```

As ações devem receber os dados como **parâmetros**:

```js
function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
}
```

**Evitar** manter dados de cenários diretamente dentro das Ações de Negócio:

```js
// Errado
function efetuarLogin() {
  const email = 'teste@mail.com';
  const senha = '12345';
  // ...
}
```

---

## Organização de Responsabilidades

```
Dados de teste
  ↓
SPEC  →  Cenário de negócio
  ↓
Ações de Negócio
  ├── Interações
  ├── Seletores
  └── Asserções
  ↓
Aplicação
```

Os módulos devem ficar organizados por funcionalidade:

```
modules/
├── login/
│   └── index.js
├── cadastro/
│   └── index.js
└── conta/
    └── index.js
```

---

## Princípios Gerais

Ao escrever ou refatorar os testes:

- Preservar o comportamento dos cenários originais.
- Reduzir duplicação de código.
- Remover detalhes de implementação das specs.
- Encapsular seletores nas Ações de Negócio com `const seletores = {}`.
- Criar funções reutilizáveis para comportamentos recorrentes.
- Não criar obrigatoriamente uma função para cada elemento ou interação individual.
- Agrupar interações relacionadas em funções coesas.
- Utilizar nomes de funções em Português do Brasil, orientados ao negócio.
- Colocar todas as asserções nos módulos de Ações de Negócio.
- Utilizar módulos com funções e `module.exports`. Evitar classes.
- Não utilizar a nomenclatura `Page`, `Pages` ou `Page Object`.
- Armazenar os módulos dentro de `modules/<funcionalidade>`.
- Manter os dados de teste separados das ações quando houver reutilização.
- Evitar criar abstrações excessivas para ações sem reutilização ou valor de negócio.
- Manter a spec responsável pela organização e orquestração dos cenários.
- Evitar aninhamento excessivo de código para resolver valores de comandos assíncronos.

---

## Regra Principal

| Camada | Responsabilidade |
|---|---|
| **Spec** | Descreve **O QUE** está sendo testado |
| **Ação de Negócio** | Define **COMO** realizar aquela operação |
| **Seletores** | Define **ONDE** interagir na aplicação |
| **Asserções** | Define **COMO** validar o resultado da ação |
| **Dados** | Define **COM QUAIS** informações executar o cenário |

Uma spec deve permitir que qualquer pessoa compreenda o comportamento testado sem precisar conhecer:

- Seletores CSS ou atributos `data-qa`;
- Estrutura HTML da aplicação;
- Detalhes de interação com elementos;
- Implementação das validações;
- Detalhes técnicos de sincronização ou resolução de comandos assíncronos.

> **Objetivo final:** a automação deve ser orientada ao comportamento e às ações de negócio, mantendo os detalhes técnicos encapsulados nos módulos responsáveis por implementá-los.
