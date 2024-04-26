class BasePage {
    static visit(path = '') {
        cy.visit(`https://advantageonlineshopping.com/${path}`);
    }

    static openLoginPopup() {
        cy.get('#menuUser').click(); // Click to open login popup
    }

    static login(username, password) {
        cy.get("input[name='username']").type(username);
        cy.get("input[name='password']").type(password);
        cy.get('#sign_in_btn').click(); // Submit login form
    }
}

export default BasePage;