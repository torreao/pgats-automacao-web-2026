/// <reference types="cypress" />

describe('Automation Exercise', () => {

    it('CT01: Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com')
        cy.xpath('//a[contains(@href, "login")]').click()

        cy.xpath('//*[@data-qa="signup-name"]').type(`PGATS Aut`)
        cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)

        cy.xpath('//*[@data-qa="signup-button"]').click()

        // radio buttons -> check
        cy.xpath('//*[@id="id_gender2"]').check()

        cy.xpath('//*[@data-qa="password"]').type('12345')

        // Selects e Comboboxes -> select
        cy.xpath('//*[@data-qa="days"]').select('1')
        cy.xpath('//*[@data-qa="months"]').select('September')
        cy.xpath('//*[@data-qa="years"]').select('1990')

        // checkboxes -> check
        cy.xpath('//*[@id="newsletter"]').check()
        cy.xpath('//*[@id="optin"]').check()

        cy.xpath('//*[@data-qa="first_name"]').type('PGATS')
        cy.xpath('//*[@data-qa="last_name"]').type('Aut')
        cy.xpath('//*[@data-qa="company"]').type('PGATS')
        cy.xpath('//*[@data-qa="address"]').type('Example Address')

        cy.xpath('//*[@data-qa="country"]').select('United States')
        cy.xpath('//*[@data-qa="state"]').type('California')
        cy.xpath('//*[@data-qa="city"]').type('San Francisco')
        cy.xpath('//*[@data-qa="zipcode"]').type('12345')

        cy.xpath('//*[@data-qa="mobile_number"]').type('999999999')

        cy.xpath('//*[@data-qa="create-account"]').click()

        cy.xpath('//*[@data-qa="account-created"]')
            .should('be.visible')
            .and('contain', 'Account Created!')
    });

    it('CT02: Efetuar Login de Usuário com email e senha corretos', () => {
        cy.visit('https://www.automationexercise.com/login')

        // ACT
        cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1792348185477@mail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('12345')

        cy.xpath('//*[@data-qa="login-button"]').click()

        // ASSERT
        cy.xpath('//ul[contains(@class, "navbar-nav")]//li[contains(., "PGATS Aut")]')
            .should('be.visible')
    });

    it('CT03: Efetuar Login de Usuário email e senha INCORRETOS', () => {
        cy.visit('https://www.automationexercise.com/login')

        // ACT
        cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1792348185477@mail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('54321')

        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//form[contains(@action, "login")]/p')
            .should('contain', 'Your email or password is incorrect!')
            .and('contain.text', 'Your email or password is incorrect!')
    });

    it('CT04: Efetuar Logout', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1792348185477@mail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('12345')

        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//a[contains(@href, "logout")]')
            .should('be.visible')
            .click()

        cy.xpath('//*[contains(@class, "login-form")]/h2').should('be.visible')
        cy.xpath('//a[contains(@href, "logout")]').should('not.exist')
    });

    it('CT05: Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('https://www.automationexercise.com')
        cy.xpath('//a[contains(@href, "login")]').click()

        cy.xpath('//*[@data-qa="signup-name"]').type(`PGATS Aut`)
        cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-1792348185477@mail.com`)

        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.xpath('//form[contains(@action, "signup")]//p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!')
    });

});