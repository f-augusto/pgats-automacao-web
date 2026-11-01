const seletores = {
  botaoProdutos: 'a[href="/products"]',
  listaProdutos: '.features_items',
  itemProduto: '.product-image-wrapper',
  linkVerProduto: '.product-image-wrapper .choose a',
  tituloPagina: 'h2.title',
  nomeProduto: '.product-information h2',
  infoProduto: '.product-information p',
  precoProduto: '.product-information span > span',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  nomesProdutos: '.features_items .productinfo p',
}

const mensagens = {
  tituloProdutos: 'All Products',
  tituloBusca: 'Searched Products',
  disponibilidade: 'Availability',
  condicao: 'Condition',
  marca: 'Brand',
  categoria: 'Category',
}

function navegarParaProdutos() {
  cy.get(seletores.botaoProdutos).click()
}

function verificarPaginaDeProdutos() {
  cy.url().should('include', '/products')
  cy.contains(mensagens.tituloProdutos).should('be.visible')
}

function verificarListaDeProdutosVisivel() {
  cy.get(seletores.listaProdutos).should('be.visible')
  cy.get(seletores.itemProduto).should('have.length.greaterThan', 0)
}

function clicarNoPrimeiroProduto() {
  cy.get(seletores.linkVerProduto).first().click()
}

function verificarDetalhesDoProduto() {
  cy.url().should('include', '/product_details')
  cy.get(seletores.nomeProduto).should('be.visible')
  cy.get(seletores.precoProduto).should('be.visible')
  cy.get(seletores.infoProduto).contains(mensagens.categoria).should('be.visible')
  cy.get(seletores.infoProduto).contains(mensagens.disponibilidade).should('be.visible')
  cy.get(seletores.infoProduto).contains(mensagens.condicao).should('be.visible')
  cy.get(seletores.infoProduto).contains(mensagens.marca).should('be.visible')
}

function buscarProduto(nomeProduto) {
  cy.get(seletores.campoBusca).type(nomeProduto)
  cy.get(seletores.botaoBusca).click()
}

function verificarResultadosDeBusca(nomesEsperados) {
  cy.get(seletores.tituloPagina)
    .should('be.visible')
    .and('contain', mensagens.tituloBusca)

  cy.get(seletores.itemProduto).should('have.length.greaterThan', 0)

  if (nomesEsperados && nomesEsperados.length > 0) {
    cy.get(seletores.nomesProdutos).should(($nomes) => {
      const nomesEncontrados = Array.from($nomes, (el) => el.textContent.trim())
      expect(nomesEncontrados).to.include.members(nomesEsperados)
    })
  }
}

module.exports = {
  navegarParaProdutos,
  verificarPaginaDeProdutos,
  verificarListaDeProdutosVisivel,
  clicarNoPrimeiroProduto,
  verificarDetalhesDoProduto,
  buscarProduto,
  verificarResultadosDeBusca,
  seletores,
}
