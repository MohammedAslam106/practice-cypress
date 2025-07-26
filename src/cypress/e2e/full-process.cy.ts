describe('Complete process', () => {
it('Complete process of the application', () => {
  cy.visit('http://localhost:5000');

  // Click to navigate to the todo form page
  cy.get('[data-testid="cy-anchor-todo-form"]').click();

  // Assert that the page title has changed
  cy.title().should('eq', 'Todo Form');

  // Fill in the form
  cy.get('[data-testid="cy-inp-title"]').should('be.visible').type('Test From Cypress');
  cy.get('[data-testid="cy-inp-description"]').should('be.visible').type('This is the test created from the cypress');

  // Submit the form
  cy.get('[data-testid="cy-send-todo"]').should('be.enabled').click();

  // Optionally assert that the new todo appears
  cy.get('[data-testid="cy-todo-cont"]')
    .contains('Test From Cypress')
    .should('exist');
});
  // cy-todo-el-p-${todo._id}

it('Mark todo as completed', () => {
  cy.visit('http://localhost:5000/todo-form-page');

  cy.title().should('eq', 'Todo Form');

  cy.get('[data-testid="cy-todo-cont"]').children().each(($el) => {
    const testId = $el.attr('data-testid')?.replace('cy-todo-el-','');
    if (!testId) return;

    const todoTextSelector = `[data-testid="cy-todo-el-p-${testId}"]`;

    cy.get(todoTextSelector).then(($todoEl) => {
      if ($todoEl.text().includes('Test From Cypress')) {
        const id = testId;
        cy.get(`[data-testid="cy-check-todo-${id}"]`).click();
      }
    });
  });
});


it('Delete the todo that is created by cypress for testing', () => {
  cy.visit('http://localhost:5000/todo-form-page');

  cy.title().should('eq', 'Todo Form');

  cy.get('[data-testid="cy-todo-cont"]').children().each(($el) => {
    const testId = $el.attr('data-testid')?.replace('cy-todo-el-','');
    if (!testId) return;

    const todoTextSelector = `[data-testid="cy-todo-el-p-${testId}"]`;

    cy.get(todoTextSelector).then(($todoEl) => {
      if ($todoEl.text().includes('Test From Cypress')) {
        const id = testId;
        cy.get(`[data-testid="cy-delete-todo-${id}"]`).click();
      }
    });
  });
});

})