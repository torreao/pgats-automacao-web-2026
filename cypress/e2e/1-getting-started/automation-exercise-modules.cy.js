/// <reference types="cypress" />

const cadastro = require("../../modules/cadastro/index")
const login = require("../../modules/login/index")
const produtos = require("../../modules/produtos/index")
const inscricao = require("../../modules/inscricao/index")
const carrinho = require("../../modules/carrinho/index")
const checkout = require("../../modules/checkout/index")
const massa = require("../../fixtures/usuario.json")

describe("Automation Exercise - Testes Modularizados e Boas Práticas", () => {

  it("CT01: Cadastrar um novo usuário com sucesso", () => {
    cy.visit("/")
    cy.get("a[href*=login]").click()

    cadastro.iniciarCadastro(
      massa.nome || "PGATS Aut",
      `pgats-aut-test-${Date.now()}@mail.com`
    )
    cadastro.preencherCadastro()
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
  })

  it("CT02: Efetuar Login de Usuário com email e senha corretos", () => {
    cy.visit("/login")

    login.preencherLogin(
      Cypress.env("usuario_existente") || "pgats-aut-test-1792360981088@mail.com",
      "12345"
    )
    login.verificarSeLoginFoiEfetuadoComSucesso()
  })

  it("CT03: Efetuar Login de Usuário email e senha INCORRECTOS", () => {
    cy.visit("/login")

    login.preencherLogin(
      Cypress.env("usuario_existente") || "pgats-aut-test-1792360981088@mail.com",
      "54321"
    )
    login.verificarSeMensagemDeErroFoiExibidaNoLogin()
  })

  it("CT04: Efetuar Logout", () => {
    cy.visit("/login")

    login.preencherLogin(
      Cypress.env("usuario_existente") || "pgats-aut-test-1792360981088@mail.com",
      "12345"
    )
    login.efetuarLogout()
    login.verificarSeOUsuarioFoiDeslogado()
  })

  it("CT05: Tentar cadastrar usuário com e-mail já cadastrado", () => {
    cy.visit("/")
    cy.get("a[href*=login]").click()

    cadastro.iniciarCadastro(
      massa.nome || "PGATS Aut",
      Cypress.env("usuario_existente") || "pgats-aut-test-1792360981088@mail.com"
    )
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
  })

  it("CT08: Verificar todos os produtos e a página de detalhes do produto", () => {
    cy.visit("/")

    produtos.verificarPaginaInicial()
    produtos.navegarParaProdutos()
    produtos.verificarDetalhesDoPrimeiroProduto()
  })

  it("CT09: Pesquisar Produto", () => {
    cy.visit("/")

    produtos.verificarPaginaInicial()
    produtos.navegarParaProdutos()
    produtos.pesquisarProduto("Dress")
  })

  it("CT10: Verificar inscrição na página inicial", () => {
    cy.visit("/")

    inscricao.verificarPaginaInicial()
    inscricao.rolarAteRodapeEVerificarTexto()
    inscricao.subscreverNewsletter(`pgats-aut-test-${Date.now()}@mail.com`)
  })

  it("CT15: Fazer pedido: Registre-se antes de finalizar a compra", () => {
    const emailDinamico = `pgats-test-${Date.now()}@mail.com`
    const nomeUsuario = massa.nome || "PGATS Aut"

    cy.visit("/")

    cy.get('a[href="/"] img').should("be.visible")

    cy.get("a[href*=login]").click()
    cadastro.iniciarCadastro(nomeUsuario, emailDinamico)
    cadastro.preencherCadastro()
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()

    cy.get('[data-qa="continue-button"]').click()
    cy.contains(`Logged in as ${nomeUsuario}`).should("be.visible")

    carrinho.adicionarProdutoAoCarrinho()
    carrinho.irParaCarrinhoEVerificar()
    carrinho.clicarFinalizarCompra()

    checkout.verificarEnderecoERevisarPedido()
    checkout.preencherComentarioEFazerPedido("Pedido automatizado de teste CT15")
    checkout.preencherPagamentoEConfirmar(
      nomeUsuario,
      "4111111111111111",
      "123",
      "12",
      "2030"
    )
    checkout.verificarMensagemDeSucesso()

    checkout.excluirContaEVerificar()
  })

  it("CT16: Fazer pedido: Faça login antes de finalizar a compra", () => {
    const emailDinamico = `pgats-login-${Date.now()}@mail.com`
    const senhaDinamica = "12345"
    const nomeUsuario = massa.nome || "PGATS Aut"

    cy.visit("/")
    cy.get('a[href="/"] img').should("be.visible")
    cy.get("a[href*=login]").click()
    cadastro.iniciarCadastro(nomeUsuario, emailDinamico)
    cadastro.preencherCadastro()
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    cy.get('[data-qa="continue-button"]').click()
    login.efetuarLogout()
    login.verificarSeOUsuarioFoiDeslogado()
    login.preencherLogin(emailDinamico, senhaDinamica)
    cy.contains(`Logged in as ${nomeUsuario}`).should("be.visible")

    carrinho.adicionarProdutoAoCarrinho()
    carrinho.irParaCarrinhoEVerificar()
    carrinho.clicarFinalizarCompra()

    checkout.verificarEnderecoERevisarPedido()
    checkout.preencherComentarioEFazerPedido("Pedido automatizado de teste CT16")
    checkout.preencherPagamentoEConfirmar(
      nomeUsuario,
      "4111111111111111",
      "123",
      "12",
      "2030"
    )
    checkout.verificarMensagemDeSucesso()

    checkout.excluirContaEVerificar()
  })

})