function verificarEnderecoERevisarPedido() {
    cy.get('#address_delivery').should('be.visible')
    cy.get('#cart_info').should('be.visible')
}

function preencherComentarioEFazerPedido(comentario) {
    cy.get('.form-control').type(comentario)
    cy.get('a[href="/payment"]').click()
}

function preencherPagamentoEConfirmar(nomeCartao, numeroCartao, cvc, mesValidade, anoValidade) {
    cy.get('[data-qa="name-on-card"]').type(nomeCartao)
    cy.get('[data-qa="card-number"]').type(numeroCartao)
    cy.get('[data-qa="cvc"]').type(cvc)
    cy.get('[data-qa="expiry-month"]').type(mesValidade)
    cy.get('[data-qa="expiry-year"]').type(anoValidade)
    cy.get('[data-qa="pay-button"]').click()
}

function verificarMensagemDeSucesso() {
    cy.get('[data-qa="order-placed"]').should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
}

function excluirContaEVerificar() {
    cy.get('a[href="/delete_account"]').click()
    cy.contains('[data-qa="account-deleted"]', /account deleted!/i).should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
}

module.exports = {
    verificarEnderecoERevisarPedido,
    preencherComentarioEFazerPedido,
    preencherPagamentoEConfirmar,
    verificarMensagemDeSucesso,
    excluirContaEVerificar
}