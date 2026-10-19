function verificarPaginaInicial() {
    cy.get('a[href="/"] img').should('be.visible')
    cy.get('#slider-carousel').should('be.visible')
}

function navegarParaProdutos() {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
    cy.contains('.title', /all products/i).should('be.visible')
    cy.get('.features_items').should('be.visible')
    cy.get('.single-products').should('have.length.greaterThan', 0)
}

function verificarDetalhesDoPrimeiroProduto() {
    cy.get('a[href="/product_details/1"]').click()
    cy.url().should('include', '/product_details/1')

    cy.get('.product-information h2').should('be.visible')
    cy.get('.product-information p').should('contain', 'Category:')
    cy.get('.product-information span span').should('be.visible')
    cy.get('.product-information p').should('contain', 'Availability:')
    cy.get('.product-information p').should('contain', 'Condition:')
    cy.get('.product-information p').should('contain', 'Brand:')
}

function pesquisarProduto(nomeProduto) {
    cy.get('#search_product').type(nomeProduto)
    cy.get('#submit_search').click()
    cy.contains('.title', /searched products/i).should('be.visible')
    
    cy.get('.features_items .single-products')
        .should('have.length.greaterThan', 0)
        .each(($produto) => {
            cy.wrap($produto).should('be.visible')
        })
}

module.exports = {
    verificarPaginaInicial,
    navegarParaProdutos,
    verificarDetalhesDoPrimeiroProduto,
    pesquisarProduto
}