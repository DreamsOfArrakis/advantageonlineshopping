class BasePage {
    static visit(path = '') {
        cy.visit(`https://opensource-demo.orangehrmlive.com/${path}`);
    }
}

export default BasePage;
