import BasePage from '../support/pages/BasePage';

describe('Base Tests', () => {
    beforeEach(() => {
        BasePage.visit(); // Open the home page
    });

    it('should login with valid credentials', () => {
        BasePage.openLoginPopup();
        BasePage.login('tester1001', 'Tester1001');

        // Validate the profile name is visible after login
        cy.get('.hi-user.containMiniTitle.ng-binding')
            .should('be.visible')
            .and('contain', 'tester1001');
    });

    // Add more tests as needed
});