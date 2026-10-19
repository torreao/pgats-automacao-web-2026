const { faker } = require('@faker-js/faker')

function iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome || faker.person.fullName())
    cy.get('[data-qa="signup-email"]').type(email || faker.internet.email())

    cy.get('[data-qa="signup-button"]').click()
}

function preencherCadastro() {
    cy.get('#id_gender2').check()

    cy.get('[data-qa="password"]').type('12345')

    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1990')

    cy.get('#newsletter').check()
    cy.get('#optin').check()

    // Gerando dados cadastrais dinâmicos com o Faker
    cy.get('[data-qa="first_name"]').type(faker.person.firstName())
    cy.get('[data-qa="last_name"]').type(faker.person.lastName())
    cy.get('[data-qa="company"]').type(faker.company.name())
    cy.get('[data-qa="address"]').type(faker.location.streetAddress())

    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type(faker.location.state())
    cy.get('[data-qa="city"]').type(faker.location.city())
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode('#####'))

    cy.get('[data-qa="mobile_number"]').type(faker.string.numeric(9))

    cy.get('[data-qa="create-account"]').click()
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain', 'Account Created!')
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
    cy.get('form[action*=signup] p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email Address already exist!')
        .and('contain.text', 'Email Address already exist!')
}

module.exports = {
    iniciarCadastro,
    preencherCadastro,
    verificarSeCadastroFoiEfetuadoComSucesso,
    verificarSeMensagemDeCadastroExistenteFoiExibida
}