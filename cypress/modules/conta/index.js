const seletores = {
  botaoDeletarConta: 'a[href*="delete_account"]',
  contaDeletada: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
  usuarioLogado: '.navbar-nav li',
}

const mensagens = {
  contaDeletada: 'Account Deleted!',
}

function validarUsuarioLogadoComo(nomeUsuario) {
  cy.get(seletores.usuarioLogado)
    .contains(nomeUsuario)
    .should('be.visible')
}

function deletarContaEValidar() {
  cy.get(seletores.botaoDeletarConta).click()
  cy.get(seletores.contaDeletada)
    .should('be.visible')
    .and('contain', mensagens.contaDeletada)
  cy.get(seletores.botaoContinuar).click()
}

module.exports = {
  validarUsuarioLogadoComo,
  deletarContaEValidar,
}
