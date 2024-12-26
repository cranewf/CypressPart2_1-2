const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "v7zd9m",
  e2e: {
    retries: 2,
    baseUrl: "https://qamid.tmweb.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
