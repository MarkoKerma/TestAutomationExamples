class SideMenu {

    elements = {
        getContactsButton: () => cy.get('[aria-label=Contacts]'),
        getLogoutButton: () => cy.get('span').contains('Logout'),
        getVenuesButton: () => cy.get('[aria-label=Venues]'),
    };

    openContactsPage() {
        this.elements.getContactsButton().click();
    }

    LogoutFromApp(){
        this.elements.getLogoutButton().click();
    }

    openVenuesPage() {
        this.elements.getVenuesButton().click();
    }
}

export default SideMenu;
