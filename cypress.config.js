const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ffwo93",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
