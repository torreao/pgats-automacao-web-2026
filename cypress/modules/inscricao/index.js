function verificarPaginaInicial() {
    cy.get('a[href="/"] img').should('be.visible')
    cy.get('#slider-carousel').should('be.visible')
}

function rolarAteRodapeEVerificarTexto() {
    cy.scrollTo('bottom')
    cy.get('footer').scrollIntoView()
    cy.contains('h2', /subscription/i).should('be.visible')
}

function subscreverNewsletter(email) {
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
    cy.get('#success-subscribe')
        .should('be.visible')
        .and('contain.text', 'You have been successfully subscribed!')
}

module.exports = {
    verificarPaginaInicial,
    rolarAteRodapeEVerificarTexto,
    subscreverNewsletter
}