/// <reference types="Cypress" />
context('init game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('hexagonal game, x cols & y rows game, should build a x-by-y-cell board ', () => {
    const cols = 10;
    const rows = 10;
    cy.get('input[name="cols"]')
      .clear()
      .type(cols);
    cy.get('input[name="rows"]')
      .clear()
      .type(rows);
    cy.get('#createBoardBtn')
      .click();

    cy.get('[data-type="cell"]').should('have.length', rows * cols);
  });

  it('rectangular game, default cols &rows values, should create a 200-cell board', () => {
    cy.get('div[name="grid-shape"]').click();
    cy.get('span[role="menuitem"]').first().click();
    cy.get('#createBoardBtn').click();

    cy.get('[data-type="cell"]').should('have.length', 200);
  })
})
