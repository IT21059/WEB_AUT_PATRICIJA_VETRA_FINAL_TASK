Cypress.Commands.add('validateTableRow', (label, value) => {
  cy.contains('td', label).siblings('td').should('contain', value);
});

Cypress.Commands.add('selectFirstSuggestion', () => {
  cy.get('.subjects-auto-complete__menu-list').first().click();
});
