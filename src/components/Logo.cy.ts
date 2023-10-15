import Logo from './Logo.vue';

describe('<Logo />', () => {
  it('renders and has active link', () => {
    cy.mount(Logo);

    cy.dataCy('home-link').should('have.class', 'router-link-active');
  });
});
