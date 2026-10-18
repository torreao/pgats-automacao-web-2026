/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/index')

describe('Automation Exercise', () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  it('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    /** Iniciar Cadastro */
    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`)
    /** Iniciar Cadastro */

    /** Preencher Cadastro */
    cadastro.preencherCadastro()
    /** Preencher Cadastro */

    /** Verificar Cadastro efetuado */
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    /** Verificar Cadastro efetuado */

  });

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    // ARRANGE
    /**
     * Ter uma conta para efetuar o Login
     * pgats-aut-test-1792360981088@mail.com / 12345
     */

    // acesso a página de login
    // Problema 1: Repetição do cy.visit
    cy.visit('https://www.automationexercise.com/login')

    /**
     * preencherLogin()
     */
    // ACT
    preencherLogin('pgats-aut-test-1792360981088@mail.com', '12345')
    /**
     * 
     */
    // cy.contains('Login') 

    // ASSERT
    // cy.get('a').should('contain', 'PGATS Aut')
    // cy.get('a > b').should('contain', 'PGATS Aut')


    // 
    // cy.contains('Logged in as PGATS Auto').should('be.visible')
    /**
     * verificarSeLoginFoiEfetuadoComSucesso()
     */
    verificarSeLoginFoiEfetuadoComSucesso()
    /**
     * verificarSeLoginFoiEfetuadoComSucesso()
     */

  });

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    preencherLogin('pgats-aut-test-1792360981088@mail.com', '54321')
    // cy.get('[data-qa="login-email"]').type('pgats-aut-test-1792360981088@mail.com')
    // cy.get('[data-qa="login-password"]').type('54321')

    // cy.get('[data-qa="login-button"]').click()

    /**
     * verificarSeMensagemDeErroFoiExibidaNoLogin()
     */
    verificarSeMensagemDeErroFoiExibidaNoLogin()
    /**
     * verificarSeMensagemDeErroFoiExibidaNoLogin()
     */
  });

  it('Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    // cy.get('[data-qa="login-email"]').type('pgats-aut-test-1792360981088@mail.com')
    // cy.get('[data-qa="login-password"]').type('12345')
    // cy.get('[data-qa="login-button"]').click()

    preencherLogin('pgats-aut-test-1792360981088@mail.com', '12345')

    /**
     * efetuarLogout
     */
    efetuarLogout()
    /**
     * efetuarLogout
     */


    /**
     * verificarSeOUsuarioFoiDeslogado
     */
    verificarSeOUsuarioFoiDeslogado()
    /**
     * verificarSeOUsuarioFoiDeslogado
     */

    // https://www.automationexercise.com/login -> 'login'

  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    // const timestamp = new Date().getTime()

    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-1792360981088@mail.com`)

    // cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
    // // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-1792360981088@mail.com`)

    // cy.get('[data-qa="signup-button"]').click()


    /**
     * verificarSeMensagemDeCadastroExistenteFoiExibida
     */
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
    /**
     * verificarSeMensagemDeCadastroExistenteFoiExibida
     */


  });

});

// CADASTRO

// function iniciarCadastro(nome, email) {

//   // cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
//   // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)

//   cy.get('[data-qa="signup-name"]').type(nome)
//   cy.get('[data-qa="signup-email"]').type(email)

//   cy.get('[data-qa="signup-button"]').click()
// }

// function preencherCadastro() {
//   // radio buttons -> check
//   cy.get('#id_gender2').check()

//   cy.get('[data-qa="password"]').type('12345')

//   // Selects e Comboboxes -> select
//   cy.get('[data-qa="days"]').select('1')
//   cy.get('[data-qa="months"]').select('September')
//   cy.get('[data-qa="years"]').select('1990')

//   // checkboxes -> check
//   cy.get('#newsletter').check()
//   cy.get('#optin').check()
//   cy.get('[data-qa="first_name"]').type('PGATS')
//   cy.get('[data-qa="last_name"]').type('Aut')
//   cy.get('[data-qa="company"]').type('PGATS')
//   cy.get('[data-qa="address"]').type('Example Address')

//   cy.get('[data-qa="country"]').select('United States')
//   cy.get('[data-qa="state"]').type('California')
//   cy.get('[data-qa="city"]').type('San Francisco')
//   cy.get('[data-qa="zipcode"]').type('12345')

//   cy.get('[data-qa="mobile_number"]').type('999999999')

//   cy.get('[data-qa="create-account"]').click()
// }

// function verificarSeCadastroFoiEfetuadoComSucesso() {
//   cy.get('[data-qa="create-account"]').click()
//   cy.get('[data-qa="account-created"]')
//     .should('be.visible')
//     .and('contain', 'Account Created!')

// }

// LOGIN

function preencherLogin(email, senha) {
  /**
   * preencherLogin()
   */
  // ACT
  // cy.get('[data-qa="login-email"]').type('pgats-aut-test-1792360981088@mail.com')
  // cy.get('[data-qa="login-password"]').type('12345')
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha)

  cy.get('[data-qa="login-button"]').click()
  /**
   * 
   */
}

function verificarSeLoginFoiEfetuadoComSucesso() {
  /**
   * verificarSeLoginFoiEfetuadoComSucesso()
   */
  cy.contains('.navbar-nav li', 'PGATS Aut')

  cy.get('.navbar-nav li')
    .contains('PGATS Aut')
    .should('be.visible')

  /**
   * verificarSeLoginFoiEfetuadoComSucesso()
   */
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  /**
   * verificarSeMensagemDeErroFoiExibidaNoLogin()
   */
  cy.get('form[action*="login"] > p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Your email or password is incorrect!')
    .and('contain.text', 'Your email or password is incorrect!')

  /**
   * verificarSeMensagemDeErroFoiExibidaNoLogin()
   */
}

function efetuarLogout() {
  /**
    * efetuarLogout
    */
  cy.get('a[href*="logout"]')
    .should('be.visible')
    .click()
  /**
   * efetuarLogout
   */

}

function verificarSeOUsuarioFoiDeslogado() {
  /**
   * verificarSeOUsuarioFoiDeslogado
   */
  cy.get('.login-form > h2').should('be.visible')
  cy.get('a[href*="logout"]').should('not.exist')
  cy.get('[action*="login"]').should('be.visible');
  cy.url().should('include', 'login')
  /**
   * verificarSeOUsuarioFoiDeslogado
   */
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  /**
   * verificarSeMensagemDeCadastroExistenteFoiExibida
   */
  cy.get('form[action*=signup] p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Email Address already exist!')
    .and('contain.text', 'Email Address already exist!')
  /**
   * verificarSeMensagemDeCadastroExistenteFoiExibida
   */
}

// Login com diferentes perfis de usuários

