const cadastro = require('../modules/cadastro/index')
const login = require('../modules/login/index')
const conta = require('../modules/conta/index')
const produtos = require('../modules/produtos/index')
const home = require('../modules/home/index')
const pedido = require('../modules/pedido/index')

const usuariosFixture = require('../fixtures/usuarios.json')
const pagamentoFixture = require('../fixtures/pagamento.json')
const produtosFixture = require('../fixtures/produtos.json')

describe('Cadastro de usuário', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve cadastrar um novo usuário com sucesso', () => {
    const usuario = { ...usuariosFixture.novoUsuario, email: `pgats-aut-test-${Date.now()}@mail.com` }

    home.verificarPaginaInicial()
    cadastro.acessarSignupLogin()
    cadastro.verificarFormularioDeSignup()
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.verificarFormularioDeCadastro()
    cadastro.preencherCadastro(usuario)
    cadastro.validarCadastroEfetuado()
    conta.validarUsuarioLogadoComo(usuario.nome)
    conta.deletarContaEValidar()
  })

  it('deve exibir erro ao tentar cadastrar com e-mail já existente', () => {
    const usuario = { ...usuariosFixture.novoUsuario, email: `pgats-tc5-${Date.now()}@mail.com` }

    home.verificarPaginaInicial()
    cadastro.acessarSignupLogin()
    cadastro.verificarFormularioDeSignup()
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.verificarFormularioDeCadastro()
    cadastro.preencherCadastro(usuario)
    cadastro.validarCadastroEfetuado()
    login.efetuarLogout()

    cadastro.acessarSignupLogin()
    cadastro.verificarFormularioDeSignup()
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.validarEmailJaCadastrado()

    login.acessarLogin()
    login.verificarFormularioDeLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    conta.validarUsuarioLogadoComo(usuario.nome)
    conta.deletarContaEValidar()
  })
})

describe('Login de usuário', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve efetuar login com email e senha corretos', () => {
    const usuario = usuariosFixture.usuarioPreExistente

    home.verificarPaginaInicial()
    login.acessarLogin()
    login.verificarFormularioDeLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    conta.validarUsuarioLogadoComo(usuario.nome)
    login.efetuarLogout()
  })

  it('deve exibir erro ao efetuar login com email e senha incorretos', () => {
    home.verificarPaginaInicial()
    login.acessarLogin()
    login.verificarFormularioDeLogin()
    login.efetuarLogin(usuariosFixture.loginInvalido.email, usuariosFixture.loginInvalido.senha)
    login.validarMensagemDeErroDeLogin()
  })

  it('deve efetuar logout com sucesso', () => {
    const usuario = usuariosFixture.usuarioPreExistente

    home.verificarPaginaInicial()
    login.acessarLogin()
    login.verificarFormularioDeLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    conta.validarUsuarioLogadoComo(usuario.nome)
    login.efetuarLogout()
    login.validarUsuarioDeslogado()
  })
})

describe('Produtos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve exibir todos os produtos e a página de detalhes do produto', () => {
    home.verificarPaginaInicial()
    produtos.navegarParaProdutos()
    produtos.verificarPaginaDeProdutos()
    produtos.verificarListaDeProdutosVisivel()
    produtos.clicarNoPrimeiroProduto()
    produtos.verificarDetalhesDoProduto()
  })

  it('deve buscar produto pelo nome e exibir resultados', () => {
    home.verificarPaginaInicial()
    produtos.navegarParaProdutos()
    produtos.verificarPaginaDeProdutos()
    produtos.buscarProduto(produtosFixture.busca.termo)
    produtos.verificarResultadosDeBusca(produtosFixture.busca.nomesEsperadosMinimo)
  })
})

describe('Assinatura', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve realizar assinatura com sucesso na página inicial', () => {
    const email = `pgats-assinatura-${Date.now()}@mail.com`

    home.verificarPaginaInicial()
    home.scrollAteRodape()
    home.verificarTextoAssinatura()
    home.preencherAssinatura(email)
    home.verificarMensagemDeSucessoAssinatura()
  })
})

describe('Pedidos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve realizar pedido após cadastrar antes do checkout', () => {
    const usuario = { ...usuariosFixture.novoUsuario, email: `pgats-aut-test-${Date.now()}@mail.com` }

    home.verificarPaginaInicial()
    cadastro.acessarSignupLogin()
    cadastro.verificarFormularioDeSignup()
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.verificarFormularioDeCadastro()
    cadastro.preencherCadastro(usuario)
    cadastro.validarCadastroEfetuado()
    conta.validarUsuarioLogadoComo(usuario.nome)

    pedido.adicionarPrimeiroProdutoAoCarrinho()
    pedido.navegarParaCarrinho()
    pedido.verificarPaginaDoCarrinho()
    pedido.prosseguirParaCheckout()
    pedido.verificarEnderecoEResumo(usuario)
    pedido.preencherComentarioEConfirmarPedido('Pedido de teste automatizado PGATS')
    pedido.preencherDadosDePagamento(pagamentoFixture.cartaoValido)
    pedido.verificarSucessoDoPedido()

    conta.deletarContaEValidar()
  })

  it('deve realizar pedido após efetuar login antes do checkout', () => {
    const usuario = usuariosFixture.usuarioPreExistente

    home.verificarPaginaInicial()
    login.acessarLogin()
    login.verificarFormularioDeLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    conta.validarUsuarioLogadoComo(usuario.nome)

    pedido.adicionarPrimeiroProdutoAoCarrinho()
    pedido.navegarParaCarrinho()
    pedido.verificarPaginaDoCarrinho()
    pedido.prosseguirParaCheckout()
    pedido.verificarEnderecoEResumo(usuario)
    pedido.preencherComentarioEConfirmarPedido('Pedido de teste automatizado PGATS')
    pedido.preencherDadosDePagamento(pagamentoFixture.cartaoValido)
    pedido.verificarSucessoDoPedido()

    login.efetuarLogout()
  })
})
