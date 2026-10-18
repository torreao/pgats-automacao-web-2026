/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/index')
const login = require('../../modules/login/index')

describe('Automation Exercise - Testes Modularizados', () => {

    it('CT01: Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*=login]').click()

        cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`)
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    })

    it('CT02: Efetuar Login de Usuário com email e senha corretos', () => {
        cy.visit('https://www.automationexercise.com/login')

        login.preencherLogin('pgats-aut-test-1792360981088@mail.com', '12345')
        login.verificarSeLoginFoiEfetuadoComSucesso()
    })

    it('CT03: Efetuar Login de Usuário email e senha INCORRETOS', () => {
        cy.visit('https://www.automationexercise.com/login')

        login.preencherLogin('pgats-aut-test-1792360981088@mail.com', '54321')
        login.verificarSeMensagemDeErroFoiExibidaNoLogin()
    })

    it('CT04: Efetuar Logout', () => {
        cy.visit('https://www.automationexercise.com/login')

        login.preencherLogin('pgats-aut-test-1792360981088@mail.com', '12345')
        login.efetuarLogout()
        login.verificarSeOUsuarioFoiDeslogado()
    })

    it('CT05: Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*=login]').click()

        cadastro.iniciarCadastro('PGATS Aut', 'pgats-aut-test-1792360981088@mail.com')
        cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
    })

})