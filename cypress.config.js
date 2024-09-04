const { defineConfig } = require("cypress");

module.exports = defineConfig({
e2e: {
baseUrl: 'https://restful-booker.herokuapp.com/apidoc/index.html',
setupNodeEvents(on, config) {
// implement node event listeners here
},
},
});
