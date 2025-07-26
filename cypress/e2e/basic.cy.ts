describe('basic test for application', () => {
  it('it renders the default text on the screen', () => {
    cy.visit('http://localhost:5000')

    cy.title().should('eq','Home')

    cy.get('[data-testid="cy-home-heading"]').should('exist').should('have.text','Hello, Welcome to todo app');

    // cy.task('log', `${9} This message appears in your terminal.`);
  })

  it('renders todos on the screen',()=>{
    cy.visit('http://localhost:5000/todo-form-page')

    cy.title().should('eq','Todo Form')

    cy.get('[data-testid="cy-todo-cont"]').children().then(($elements) => {
      const keys:any = [];
      $elements.each((_, element) => {
        const key = element.getAttribute('data-testid'); 
        if(key) keys.push(key);
      });

      cy.task('log',keys.length)

      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).to.equal(keys.length);
    });
  })
})