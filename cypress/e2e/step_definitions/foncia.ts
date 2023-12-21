import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "@pages/foncia";


Given("L'utilisateur accède au site Foncia", function () {
    cy.visit("/");
  });

When("L'utilisateur visite la page d'accueil", function () {
    homePage.acceptCookies();
    homePage.checkCurrentUrlPageHome();
  });

Then("La page d'accueil doit comporter toutes les rubriques", function () {
    homePage.clickMenuButton();
    homePage.verifySections();
  });
