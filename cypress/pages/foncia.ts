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
}

export const homePage = new HomePage();
