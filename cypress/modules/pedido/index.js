const { seletores: seletoresProdutos } = require('../produtos/index')

const seletores = {
  botaoAdicionarAoCarrinho: 'button.cart',
  botaoFecharModal: '#cartModal .close-modal',
  linkCarrinho: '.navbar-nav a[href="/view_cart"]',
  tabelaCarrinho: '.cart_info',
  botaoProsseguirCheckout: 'a.btn.check_out',
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  resumoPedido: '#cart_info',
  campoComentario: '#ordermsg',
  linkRealizarPedido: 'a[href="/payment"]',
  nomeNoCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  tituloPedidoConfirmado: '[data-qa="order-placed"] b',
  mensagemSucessoPedido: '.container p',
}

const mensagens = {
  prosseguirCheckout: 'Proceed To Checkout',
  realizarPedido: 'Place Order',
  tituloPedidoConfirmado: 'Order Placed!',
  sucessoPedido: 'Your order has been placed successfully!',
}

function adicionarPrimeiroProdutoAoCarrinho() {
  cy.get(seletoresProdutos.linkVerProduto).first().click()
  cy.get(seletores.botaoAdicionarAoCarrinho).click()
  cy.get(seletores.botaoFecharModal).click()
}

function navegarParaCarrinho() {
  cy.get(seletores.linkCarrinho).click()
}

function verificarPaginaDoCarrinho() {
  cy.url().should('include', '/view_cart')
  cy.get(seletores.tabelaCarrinho).should('be.visible')
}

function prosseguirParaCheckout() {
  cy.get(seletores.botaoProsseguirCheckout).click()
}

function verificarEnderecoEResumo(usuario) {
  cy.url().should('include', '/checkout')

  const dadosEndereco = [
    `${usuario.primeiroNome} ${usuario.ultimoNome}`,
    usuario.empresa,
    usuario.endereco,
    `${usuario.cidade} ${usuario.estado} ${usuario.cep}`,
    usuario.celular,
  ]

  ;[seletores.enderecoEntrega, seletores.enderecoCobranca].forEach((seletor) => {
    cy.get(seletor)
      .should('be.visible')
      .should(($el) => {
        const texto = $el.text().replace(/\s+/g, ' ').trim()
        dadosEndereco.forEach((dado) => {
          expect(texto, `endereço deve conter "${dado}"`).to.include(dado)
        })
      })
  })

  cy.get(seletores.resumoPedido).should('be.visible')
}

function preencherComentarioEConfirmarPedido(comentario) {
  cy.get(seletores.campoComentario).type(comentario)
  cy.get(seletores.linkRealizarPedido).click()
}

function preencherDadosDePagamento(dados) {
  cy.get(seletores.nomeNoCartao).type(dados.nomeNoCartao)
  cy.get(seletores.numeroCartao).type(dados.numeroCartao)
  cy.get(seletores.cvc).type(dados.cvc)
  cy.get(seletores.mesExpiracao).type(dados.mesExpiracao)
  cy.get(seletores.anoExpiracao).type(dados.anoExpiracao)
  cy.get(seletores.botaoPagar).click()
}

function verificarSucessoDoPedido() {
  cy.get(seletores.tituloPedidoConfirmado)
    .should('be.visible')
    .and('have.text', mensagens.tituloPedidoConfirmado)
  cy.get(seletores.mensagemSucessoPedido)
    .should('be.visible')
    .and('contain', mensagens.sucessoPedido)
}

module.exports = {
  adicionarPrimeiroProdutoAoCarrinho,
  navegarParaCarrinho,
  verificarPaginaDoCarrinho,
  prosseguirParaCheckout,
  verificarEnderecoEResumo,
  preencherComentarioEConfirmarPedido,
  preencherDadosDePagamento,
  verificarSucessoDoPedido,
}
