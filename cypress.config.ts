import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "src/cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
          on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
  },
});
