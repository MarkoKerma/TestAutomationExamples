/// <reference types="cypress" />
import LoginPage from '../../pages/LoginPage';
import SideMenu from '../../pages/SideMenu';
import VenuesPage from '../../pages/VenuesPage';
import CustomJSCommands from '../../support/custom';
import { slowCypressDown } from 'cypress-slow-down';
import testData from '../../fixtures/testData.json';
import UrevitedAPI from '../../support/urevited-api';

describe('Urevited venues tests', () => {
    const loginPage = new LoginPage();
    const sideMenu = new SideMenu();
    const venuesPage = new VenuesPage();
    const customJSCommands = new CustomJSCommands();
    const urevitedAPI = new UrevitedAPI();

    const address = testData.address;
    const venueName = customJSCommands.randomName(8);

    beforeEach(() => {
        loginPage.loginToUrevited(Cypress.env('username'), Cypress.env('password'));
        cy.getLoginToken();
    });

    it('Create new venue and check with API', () => {
        slowCypressDown(750);
        sideMenu.openVenuesPage();
        venuesPage.clickNewVenueButton();
        venuesPage.writeVenueName(venueName);
        venuesPage.writeVenueAddress(address);
        venuesPage.addNewVenue();

        urevitedAPI.venueSearchableAPI(venueName);
    });

    afterEach(() => {
        sideMenu.LogoutFromApp();
    });
});