// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getLoginToken', () => {
  cy.request({
    method: 'POST',
    url:
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      Cypress.env('apiSecret'),
    headers: {
      origin: 'https://dev.app.urevited.com',
    },
    body: {
      returnSecureToken: true,
      email: Cypress.env('username'),
      password: Cypress.env('password'),
    },
  })
    .its('body')
    .then((body) => {
      window.localStorage.setItem('Token', body.idToken);
    });
});
