const seletores = {
  carrossel: '#slider-carousel',
  tituloFeaturedItems: '.features_items h2.title',
  rodape: 'footer',
  campoEmailAssinatura: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  mensagemSucessoAssinatura: '.alert-success',
}

const mensagens = {
  tituloHome: 'Features Items',
  tituloAssinatura: 'Subscription',
  sucessoAssinatura: 'You have been successfully subscribed!',
}

function verificarPaginaInicial() {
  cy.url().should('eq', Cypress.config('baseUrl') + '/')
  cy.get(seletores.carrossel).should('exist')
  cy.get(seletores.tituloFeaturedItems)
    .should('be.visible')
    .and('contain', mensagens.tituloHome)
}

function scrollAteRodape() {
  cy.get(seletores.rodape).scrollIntoView()
}

function verificarTextoAssinatura() {
  cy.get(seletores.rodape)
    .should('be.visible')
    .and('contain', mensagens.tituloAssinatura)
}

function preencherAssinatura(email) {
  cy.get(seletores.campoEmailAssinatura).type(email)
  cy.get(seletores.botaoInscrever).click()
}

function verificarMensagemDeSucessoAssinatura() {
  cy.get(seletores.mensagemSucessoAssinatura)
    .should('be.visible')
    .and('contain', mensagens.sucessoAssinatura)
}

module.exports = {
  verificarPaginaInicial,
  scrollAteRodape,
  verificarTextoAssinatura,
  preencherAssinatura,
  verificarMensagemDeSucessoAssinatura,
}
