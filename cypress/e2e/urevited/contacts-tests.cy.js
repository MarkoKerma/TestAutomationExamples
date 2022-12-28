/// <reference types="cypress" />
import LoginPage from '../../pages/LoginPage';
import SideMenu from '../../pages/SideMenu';
import ContactsPage from '../../pages/ContactsPage';
import CustomJSCommands from '../../support/custom';
import { slowCypressDown } from 'cypress-slow-down';

describe('Urevited contacts tests', () => {
    const loginPage = new LoginPage();
    const sideMenu = new SideMenu();
    const contactsPage = new ContactsPage();
    const customJSCommands = new CustomJSCommands();

    const email = Cypress.env('username');
    const password = Cypress.env('password');
    const firstName = customJSCommands.randomName(8);
    const lastName = customJSCommands.randomName(8);
    const originalLastName = customJSCommands.randomName(6);
    const editedLastName = customJSCommands.randomName(10);

    beforeEach(() => {
        loginPage.loginToUrevited(email, password);
    });

    it('Create new contact', () => {
        slowCypressDown(750);
        sideMenu.openContactsPage();
        contactsPage.openContactManagementMenu();
        contactsPage.clickOnNewContactButton();
        contactsPage.writeContactFirstName(firstName);
        contactsPage.writeContactLastName(lastName);
        contactsPage.addContact();
        contactsPage.searchForContact(lastName);
        contactsPage.getFirstContactInSearch(lastName).should('be.visible');
    });

    it('Edit contact', () => {
        slowCypressDown(750);
        sideMenu.openContactsPage();
        contactsPage.openContactManagementMenu();
        contactsPage.clickOnNewContactButton();
        contactsPage.writeContactLastName(originalLastName);
        contactsPage.addContact();
        contactsPage.searchForContact(originalLastName);
        contactsPage.getFirstContactInSearch(originalLastName);
        contactsPage.openEditContactWindow();
        contactsPage.writeContactLastName(editedLastName);
        contactsPage.saveContact();
        contactsPage.searchForContact(editedLastName);
        contactsPage.getFirstContactInSearch(editedLastName).should('be.visible');
    });

    afterEach(() => {
        sideMenu.LogoutFromApp();
    });
});