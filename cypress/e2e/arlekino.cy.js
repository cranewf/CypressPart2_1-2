const admin = require("../fixtures/admin.json");
const adminUrl = admin.url;
const happyPath = admin.happyPath;
const sadPath = admin.sadPath;

const client = require("../fixtures/client.json");
const clientUrl = client.url;

const selector = require("../fixtures/selectors.json");
const adminTitleSelector = selector.adminTitleSelector;
const adminAuthSelector = selector.adminAuthSelector;
const navigationDays = selector.navigationDays;
const poster = selector.poster;
const arlekinoHall = selector.arlekinoHall;
const buttonOk = selector.buttonOk;

const data = require("../fixtures/data.json");
const day = data.day;
const time = data.time;
const seats = data.seats;

describe("login as administrator", () => {
  beforeEach(() => {
    cy.visit(adminUrl);
    cy.get(adminTitleSelector).should("contain", "Авторизация");
  });

  it("successful login", () => {
    cy.authAdmin(happyPath.login, happyPath.pass);
    cy.contains("Управление залами").should("be.visible");
  });

  it("Login with empty login", () => {
    cy.authAdmin(sadPath[0].login, sadPath[0].pass);
    cy.get(adminAuthSelector).should("be.visible");
  });

  it("Login with blank password", () => {
    cy.authAdmin(sadPath[1].login, sadPath[1].pass);
    cy.get(adminAuthSelector).should("be.visible");
  });
});

describe("Booking movie tickets", () => {
  beforeEach(() => {
    cy.visit(clientUrl);
  });

  it("display start page", () => {
    cy.get(navigationDays).should("have.length", 7);
  });

  it("ticket booking", () => {
    cy.get(navigationDays + `:nth-of-type(${day})`).click();
    cy.get(poster).contains(time).click();
    seats.forEach(({ row, seat }) => {
      cy.get(
        arlekinoHall + ` > :nth-child(${row}) > :nth-child(${seat})`
      ).click();
    });
    cy.timeout(20000);
    cy.get(buttonOk).should("be.visible").click();
    cy.get(".ticket__chairs").should(($list) => {
      seats.forEach(({ row, seat }) => {
        expect($list).to.contain(`${row}/${seat}`);
      });
    });
  });
});
