import BasePage from './BasePage';

class DashboardPage extends BasePage {
    static get dashboardHeader() {
        return cy.get('#welcome');
    }
}

export default DashboardPage;
