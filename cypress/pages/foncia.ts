////////////////////////////////////////
// Locators 
///////////////////////////////////////

const acceptCookiesSelector = "app-foncia-cookie-banner > div:nth-of-type(2)";
const urlHomePage = "https://fr.foncia.com/";
const menuButtonSelector = "div:nth-of-type(3) > p-button > button";
const expectedSectionsSelector = {
  "Acheter": ":nth-child(1) > .header-tab-link",
  "Louer": ":nth-child(2) > .header-tab-link",
  "Vendre": ":nth-child(3) > .header-tab-link",
  "Gestion locative": ":nth-child(4) > .header-tab-link",
  "Syndic": ":nth-child(5) > .header-tab-link",
  "Vacances": ":nth-child(6) > .header-tab-link",
  "Découvrir Foncia": ":nth-child(7) > .header-tab-link",
  "Carrières": ":nth-child(8) > .header-tab-link",
};
const projectSelector = "#projectToggle";
const selectLouer = ":nth-child(2) > .p-radiobutton-label";
const selectPropertyType = '#propertyToggle';
const selectApartment = '.popup-form > :nth-child(1) > :nth-child(1) > .p-checkbox-label';
const maxPriceSelector = "#price";
const searchButtonSelector = ".button > :nth-child(2) > .p-button";
const citySelector = ".p-autocomplete > .ng-tns-c57-16";
const selectPris = "#pr_id_6_list > :nth-child(2) > .ng-tns-c57-16";
const acceptCookies = ".cookie-cta-accept > .p-button";
const listeOfAllValues = "div.foncia-card-price";
const totalSearchResults = ".search-results-header-total > .search-results-header-value";
const pagination = ".map-pagination li"
const nextPageSelector = ".page-link-rel";


////////////////////////////////////////
// Méthodes
///////////////////////////////////////
class HomePage {

  // Accepter les cookies
  acceptCookies() {
    cy.get(acceptCookiesSelector).click();
  }

  // Vérifier l'URL de la page d'accueil
  checkCurrentUrlPageHome() {
    cy.url().should('eq', urlHomePage);
  }

  // Cliquer sur le bouton de menu
  clickMenuButton() {
    cy.get(menuButtonSelector).click();
  }

  // Vérifier que toutes les rubriques existent
  verifySections() {
    cy.fixture('sections').then((sections) => {
      const expectedSections = sections.expectedSections;

      // Vérifier chaque section
      for (const section of expectedSections) {
        const selector = expectedSectionsSelector[section];
        if (selector) {
          cy.log(`Vérification de la section ${section}`);
          // Utiliser des assertions plutôt que des logs pour les erreurs
          cy.get(selector).should('exist').and('contain', section);
        }
      }
    });
  }

  selectproject(city: string, price: string) {
    cy.get(projectSelector).click();
    cy.get(selectLouer).click();
    cy.get(selectPropertyType).click();
    cy.get(selectApartment).click();
    cy.get(maxPriceSelector).type(price);
    cy.get(citySelector).type(city);
    cy.get(selectPris).click();

  }

  checkValuesOnAllPages(maxPrice:number) {
    let listOfValues: any = [];
    cy.get(acceptCookies).click();
    cy.get(searchButtonSelector).click();
    cy.get(totalSearchResults).invoke('text').then((text: string) => {
      // Faites quelque chose avec le texte récupéré
      cy.log(`Le texte du champ totalSearchResults est : ${text}`);
      let totalResultat: number = parseInt(text, 10);
      cy.log("totalResultat", totalResultat);
      if (totalResultat != 0 && totalResultat <= 15) {

        cy.get(listeOfAllValues).invoke('text').then((valuesText) => {
          const valuesArray = valuesText.split('€/ mois CC');

          valuesArray.forEach((value) => {
            if (value != '') {
              listOfValues.push(value.replace(',', '.').replace(/\s+/g, '').replace(' ', ''));
            }
          });
          for (let i = 0; i < listOfValues.length; i++) {
            //  listOfValues[i].replace('€/ mois CC', ' ');
            let rentPrice = parseFloat(listOfValues[i]);
            expect(parseFloat(maxPrice)).to.be.greaterThan(rentPrice);
            cy.log(`Assertion réussie pour la valeur : ${maxPrice}`);
            cy.log(`Assertion réussie pour la valeur : ${listOfValues[i]}`);
          }

        });

      } else {
        cy.viewport(1920, 1080); // Résolution Full HD
        let getPagination = cy.get(pagination)
        getPagination.its('length').then((paginationLength) => {

          for (let i: any = 1; i <= paginationLength; i++) {
            // Votre logique pour chaque élément de la pagination

            let listOfValues: any = [];
            const getallvalues = cy.get(listeOfAllValues).invoke('text').then((valuesText) => {
              // Supprimez '€/ mois CC' de chaque valeur et ajoutez-la à listOfValues
              const valuesArray = valuesText.split('€/ mois CC');

              valuesArray.forEach((value) => {
                if (value != '') {
                  listOfValues.push(value);
                }
              });
              for (let i = 0; i < listOfValues.length; i++) {

                let rentPrice = parseFloat(listOfValues[i].replace(',', '.').replace(/\s+/g, '').replace(' ', ''));
                expect(parseFloat(maxPrice)).to.be.greaterThan(rentPrice);
                cy.log(`Assertion réussie pour la valeur : ${(listOfValues[i].replace(',', '.').replace(/\s+/g, ''))}`);
              }
              cy.get(nextPageSelector).click();
              cy.get(nextPageSelector).click();

            });
          }
        });
      }
    });

  }
}



export const homePage = new HomePage();
