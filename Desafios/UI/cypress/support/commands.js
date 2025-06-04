Cypress.Commands.add('preencherFormularioCadastro', (nome, email,senha, confirmarSenha) => {
  cy.get('#ion-input-4').click().type(nome)
  cy.get('#ion-input-5').click().type(email)
  cy.get('#ion-input-6').click().type(senha)
  cy.get('#ion-input-7').click().type(confirmarSenha)
});

Cypress.Commands.add('selecioneSeuEstado', () => {
  cy.get('.selector-field > .ng-untouched').click();
  cy.get('.action-sheet-container > :nth-child(1) > :nth-child(8)').click(); // Seleciona o estado
});

Cypress.Commands.add('preencherCamposObrigatórios', () => {
  cy.get('.checkbox.ion-valid > .ng-untouched').click();
  cy.get('.checkbox.ion-invalid > .md > :nth-child(2)').click();
  cy.get('.is-primary').click();
});



