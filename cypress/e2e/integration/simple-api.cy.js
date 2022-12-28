/// <reference types="cypress" />
import CustomJSCommands from "../../support/custom";

describe('Integration testing', () => {
    const customJSCommands = new CustomJSCommands();

    const userEmail = 'marko.petricevic' + '+' + customJSCommands.randomName(6) + '@servalit.com'

    beforeEach(() => {
        cy.getLoginToken();
    });

    it('Check current user name', () => {
        cy.request({
            method: 'POST',
            url: 'https://dev.api.urevited.com/core-api/graphql',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('Token')
            },
            body: {
                "operationName": "CurrentUser",
                "variables": {},
                "query": "query CurrentUser {\n  currentUser {\n    id\n    firstName\n    lastName\n    email\n    firebaseId\n    invitationsNo\n    status\n    role\n    permissions\n    originalUser {\n      firstName\n      lastName\n      email\n      id\n      __typename\n    }\n    __typename\n  }\n}"
            }
        }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.data.currentUser.firstName).equal('Marko');
        });
    });

    it('Check wrong name match', () => {
        cy.request({
            method: 'POST',
            url: 'https://dev.api.urevited.com/core-api/graphql',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('Token')
            },
            body: {
                "operationName": "CurrentUser",
                "variables": {},
                "query": "query CurrentUser {\n  currentUser {\n    id\n    firstName\n    lastName\n    email\n    firebaseId\n    invitationsNo\n    status\n    role\n    permissions\n    originalUser {\n      firstName\n      lastName\n      email\n      id\n      __typename\n    }\n    __typename\n  }\n}"
            }
        }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.data.currentUser.firstName).not.equal('NotMarko');
        });
    });

    it('Register user by API', () => {
        cy.request({
            method: 'POST',
            url: 'https://dev.api.urevited.com/core-api/graphql',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('Token')
            },
            body: {
                "operationName": "registerUserAsAdmin",
                "variables": {
                    "input": {
                        "firstName": "Servalit Automation",
                        "lastName": "Test presentation",
                        "email": userEmail,
                        "role": "User"
                    }
                },
                "query": "mutation registerUserAsAdmin($input: RegisterUserAsAdminInput) {\n  registerUserAsAdmin(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    firebaseId\n    invitationsNo\n    status\n    role\n    __typename\n  }\n}"
            }
        }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.data.registerUserAsAdmin.email).equal(userEmail);
        });
    });

    it('Register user by API - no token sent', () => {
        cy.request({
            method: 'POST',
            url: 'https://dev.api.urevited.com/core-api/graphql',
            headers: {
                //not sending token
            },
            body: {
                "operationName": "registerUserAsAdmin",
                "variables": {
                    "input": {
                        "firstName": "Servalit Automation",
                        "lastName": "Test presentation",
                        "email": userEmail,
                        "role": "User"
                    }
                },
                "query": "mutation registerUserAsAdmin($input: RegisterUserAsAdminInput) {\n  registerUserAsAdmin(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    firebaseId\n    invitationsNo\n    status\n    role\n    __typename\n  }\n}"
            }
        }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.errors[0].message).equal("The current user is not authorized to access this resource.")
        });
    });
});