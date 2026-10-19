const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    watchForFileChanges: false,
    testIsolation: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});