function preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(String(senha || '12345'))
    cy.get('[data-qa="login-button"]').click()
}

function verificarSeLoginFoiEfetuadoComSucesso() {
    cy.get('a[href="/logout"]').should('be.visible')
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
    cy.contains('Your email or password is incorrect!').should('be.visible')
}

function efetuarLogout() {
    cy.get('a[href="/logout"]').click()
}

function verificarSeOUsuarioFoiDeslogado() {
    cy.url().should('include', '/login')
    cy.contains('Login to your account').should('be.visible')
}

module.exports = {
    preencherLogin,
    verificarSeLoginFoiEfetuadoComSucesso,
    verificarSeMensagemDeErroFoiExibidaNoLogin,
    efetuarLogout,
    verificarSeOUsuarioFoiDeslogado
}