/// <reference types="Cypress" />
context('action buttons', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should increment / decrement counter', () => {

    cy.get('#createBoardBtn').click();

    cy.get('span.fa-arrow-left').should('not.be.visible');
    cy.get('span.fa-arrow-right').should('be.visible');
    cy.get('#iterationCounter').should('have.text', 'Iteration #0');


    cy.get('span.fa-arrow-right')
      .click()
      .click()
      .click();

    cy.get('#iterationCounter').should('have.text', 'Iteration #3');

    cy.get('span.fa-arrow-left')
      .click()
      .should('be.visible');

    cy.get('#iterationCounter').should('have.text', 'Iteration #2')
  })
})
