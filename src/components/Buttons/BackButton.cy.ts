import BackButton from './BackButton.vue';

describe('<BackButton />', () => {
  it('renders', () => {
    cy.mount(BackButton);

    cy.dataCy('back-button').should('be.visible');
  });
});
