const selector = require("../fixtures/selectors.json");

const adminLoginSelector = selector.adminLoginSelector;
const adminPassSelector = selector.adminPassSelector;
const adminAuthSelector = selector.adminAuthSelector;

//Авторизация
Cypress.Commands.add("authAdmin", (login, password) => {
  cy.get(adminLoginSelector).type(login);
  cy.get(adminPassSelector).type(password);
  cy.get(adminAuthSelector).click();
});
