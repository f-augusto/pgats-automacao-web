const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  tituloLogin: '.login-form > h2',
  mensagemErro: 'form[action*="login"] > p',
  botaoLogout: 'a[href*="logout"]',
  formularioLogin: '[action*="login"]',
}

const mensagens = {
  tituloLogin: 'Login to your account',
  erroCredenciais: 'Your email or password is incorrect!',
}

function acessarLogin() {
  cy.visit('/login')
}

function verificarFormularioDeLogin() {
  cy.get(seletores.tituloLogin)
    .should('be.visible')
    .and('contain', mensagens.tituloLogin)
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
  cy.get(seletores.botaoLogin).click()
}

function validarMensagemDeErroDeLogin() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('contain', mensagens.erroCredenciais)
}

function efetuarLogout() {
  cy.get(seletores.botaoLogout).should('be.visible').click()
}

function validarUsuarioDeslogado() {
  cy.get(seletores.tituloLogin).should('be.visible')
  cy.get(seletores.botaoLogout).should('not.exist')
  cy.get(seletores.formularioLogin).should('be.visible')
  cy.url().should('include', 'login')
}

module.exports = {
  acessarLogin,
  verificarFormularioDeLogin,
  efetuarLogin,
  validarMensagemDeErroDeLogin,
  efetuarLogout,
  validarUsuarioDeslogado,
}
