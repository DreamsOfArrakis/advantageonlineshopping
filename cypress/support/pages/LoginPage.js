import BasePage from './BasePage';

class LoginPage extends BasePage {
    static get inputUsername() {
        return cy.get("input[placeholder='Username']");
    }

    static get inputPassword() {
        return cy.get("input[placeholder='Password']");
    }

    static get btnSubmit() {
        return cy.contains('button', 'Login');
    }

    static login(username, password) {
        this.inputUsername.type(username);
        this.inputPassword.type(password);
        this.btnSubmit.click();
    }

    static open() {
        super.visit('web/index.php/auth/login');
    }
}

export default LoginPage;
