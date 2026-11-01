const seletores = {
  nomeSignup: '[data-qa="signup-name"]',
  emailSignup: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  tituloSignup: '.signup-form h2',
  tituloFormularioCadastro: '.login-form h2',
  titulo: '#id_gender2',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  ultimoNome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
  mensagemEmailExistente: 'form[action*=signup] p',
}

const mensagens = {
  tituloSignup: 'New User Signup!',
  tituloCadastro: 'Enter Account Information',
  contaCriada: 'Account Created!',
  emailExistente: 'Email Address already exist!',
}

function acessarSignupLogin() {
  cy.visit('/login')
}

function verificarFormularioDeSignup() {
  cy.get(seletores.tituloSignup)
    .should('be.visible')
    .and('contain', mensagens.tituloSignup)
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.nomeSignup).type(nome)
  cy.get(seletores.emailSignup).type(email)
  cy.get(seletores.botaoSignup).click()
}

function verificarFormularioDeCadastro() {
  cy.get(seletores.tituloFormularioCadastro)
    .should('be.visible')
    .and('contain', mensagens.tituloCadastro)
}

function preencherCadastro(usuario) {
  cy.get(seletores.titulo).check()
  cy.get(seletores.senha).type(usuario.senha)
  cy.get(seletores.diaNascimento).select(usuario.diaNascimento)
  cy.get(seletores.mesNascimento).select(usuario.mesNascimento)
  cy.get(seletores.anoNascimento).select(usuario.anoNascimento)
  cy.get(seletores.newsletter).check()
  cy.get(seletores.ofertas).check()
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome)
  cy.get(seletores.ultimoNome).type(usuario.ultimoNome)
  cy.get(seletores.empresa).type(usuario.empresa)
  cy.get(seletores.endereco).type(usuario.endereco)
  cy.get(seletores.pais).select(usuario.pais)
  cy.get(seletores.estado).type(usuario.estado)
  cy.get(seletores.cidade).type(usuario.cidade)
  cy.get(seletores.cep).type(usuario.cep)
  cy.get(seletores.celular).type(usuario.celular)
  cy.get(seletores.botaoCriarConta).click()
}

function validarCadastroEfetuado() {
  cy.get(seletores.contaCriada)
    .should('be.visible')
    .and('contain', mensagens.contaCriada)
  cy.get(seletores.botaoContinuar).click()
}

function validarEmailJaCadastrado() {
  cy.get(seletores.mensagemEmailExistente)
    .should('be.visible')
    .and('contain', mensagens.emailExistente)
}

module.exports = {
  acessarSignupLogin,
  verificarFormularioDeSignup,
  iniciarCadastro,
  verificarFormularioDeCadastro,
  preencherCadastro,
  validarCadastroEfetuado,
  validarEmailJaCadastrado,
}
