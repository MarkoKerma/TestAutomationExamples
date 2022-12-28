class VenuesPage {

    elements = {
        getCreateNewVenueButton: () => cy.get('button').contains('Create new venue'),
        getNameInput: () => cy.get('#name'),
        getAddressInput: () => cy.get('#address'),
        // getSearchInput: () => cy.get('[placeholder="Search results"]'),
    };

    clickNewVenueButton() {
        this.elements.getCreateNewVenueButton().click();
    }

    writeVenueName(venue) {
        this.elements.getNameInput().clear().type(venue);
    }

    writeVenueAddress(address) {
        this.elements.getAddressInput().clear().type(address);
    }

    addNewVenue() {
        cy.get('form').submit();
    }
}

export default VenuesPage
