/// <reference types="cypress" />
import { slowCypressDown } from 'cypress-slow-down';

describe('ServalIT test presentation', () => {
  it('Simple test', () => {
    slowCypressDown(1000);
    cy.visit('/login');
    cy.get('#email').type('marko.petricevic+admin@servalit.com');
    cy.get('#password').type('Test12345!');
    cy.get('form').submit();
    cy.get('button').contains('Create new invitation').should('be.visible');
    cy.get('*[class^="jss"]')
      .contains('Successfully logged in')
      .should('be.visible');
  });

  after(() => {
    cy.get('span').contains('Logout').click();
  });
});
