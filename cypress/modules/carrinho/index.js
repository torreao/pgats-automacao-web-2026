function adicionarProdutoAoCarrinho() {
    cy.get('.single-products').first().trigger('mouseover')
    cy.get('.add-to-cart').first().click()
    cy.get('.modal-content').should('be.visible')
    
    // Filtra pelo texto 'Continue Shopping' ou usa o botão visível do modal
    cy.get('.modal-footer .btn-success').click()
}

function irParaCarrinhoEVerificar() {
    cy.get('a[href="/view_cart"]').first().click()
    cy.url().should('include', '/view_cart')
    cy.get('#cart_items').should('be.visible')
}

function clicarFinalizarCompra() {
    cy.get('.btn-default').contains('Proceed To Checkout').click()
}

module.exports = {
    adicionarProdutoAoCarrinho,
    irParaCarrinhoEVerificar,
    clicarFinalizarCompra
}