class ContactsPage {
  elements = {
    getContactManagementButton: () =>
      cy.get('button').contains('Contact management'),
    getNewContactButton: () => cy.get('li').contains('New Contact'),
    getContactFirstName: () => cy.get('[id="firstName[0]"]'),
    getContactLastName: () => cy.get('[id="lastName[0]"]'),
    getAddContactButton: () => cy.get('button').contains('Add'),
    getSearchInput: () => cy.get('[placeholder="Search results"]'),
    getContactsTable: () => cy.get('td'),
    getContactOptionsMenu: () => cy.get('[alt="Option image"]'),
    getEditButton: () => cy.get('[data-testid=EditIcon]'),
    getSaveContactButton: () => cy.get('button').contains('Save'),
  };

  ContactManagementButton() {
    return this.elements.getContactManagementButton();
  }

  openContactManagementMenu() {
    this.ContactManagementButton().click();
  }

  clickOnNewContactButton() {
    this.elements.getNewContactButton().click();
  }

  ContactFirstName() {
    return this.elements.getContactFirstName();
  }

  ContactLastName() {
    return this.elements.getContactLastName();
  }

  writeContactFirstName(name) {
    this.ContactFirstName().clear().type(name);
  }

  writeContactLastName(lastName) {
    this.ContactLastName().clear().type(lastName);
  }

  addContact() {
    this.elements.getAddContactButton().click();
  }

  searchForContact(contact) {
    this.elements.getSearchInput().clear().type(contact);
  }

  getFirstContactInSearch(contactName) {
    return cy.get('td').siblings().contains('p', contactName);
  }

  openEditContactWindow() {
    this.elements.getContactOptionsMenu().click();
    this.elements.getEditButton().click();
  }

  saveContact() {
    this.elements.getSaveContactButton().click();
  }
}

export default ContactsPage;
