class SettingsPage {

    elements = {
        getCreateNewInvitationButton: () => cy.cy.get('button').contains('Create new invitation')
    };

    newInvitationButton() {
        return this.elements.getSettingElement();
    }
}

export default SettingsPage;
