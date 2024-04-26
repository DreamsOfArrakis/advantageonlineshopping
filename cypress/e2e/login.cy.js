import LoginPage from '../support/pages/LoginPage';
import DashboardPage from '../support/pages/DashboardPage';

describe('Login Tests', () => {
    beforeEach(() => {
        LoginPage.open();
    });

    it('should login with valid credentials', () => {
        LoginPage.login('Admin', 'admin123');

        // // Validate the URL has changed to the dashboard
        // cy.url().should('include', '/dashboard');

        // // Ensure the dashboard header is existing and has the correct text
        // DashboardPage.dashboardHeader.should('be.visible')
        //     .and('contain.text', 'Welcome');
    });

    // Add more tests as needed
});
