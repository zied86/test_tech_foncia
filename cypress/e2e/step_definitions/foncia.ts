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


Given("L'utilisateur effectue une recherche avec les critères Louer un appartement à {string} avec un loyer MAX {string}€", function (city:string, price:string) {
  homePage.selectproject(city,price)
  });

Then("Les résultats de la recherche devraient inclure des appartements avec un loyer maximal de {string}€",function(maxPrice:number){
  homePage.checkValuesOnAllPages(maxPrice)

});