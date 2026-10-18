const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false, // Dispara a execução automática ao salvar
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});