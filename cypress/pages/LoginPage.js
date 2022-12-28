class LoginPage {
  elements = {
    getEmailInput: () => cy.get('#email'),
    getPasswordInput: () => cy.get('#password'),
    getLoginForm: () => cy.get('form'),
  };

  typeEmail(email) {
    return this.elements.getEmailInput().type(email);
  }

  typePassword(password) {
    return this.elements.getPasswordInput().type(password);
  }

  submitLogin() {
    this.elements.getLoginForm().submit();
  }

  loginToUrevited(email, password) {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('/login');
    this.typeEmail(email);
    this.typePassword(password);
    this.submitLogin();
  }
}

export default LoginPage;
