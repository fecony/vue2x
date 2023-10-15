import EmptyList from './EmptyList.vue';

describe('<EmptyList />', () => {
  it('renders', () => {
    cy.mount(EmptyList);

    cy.get('section').should('be.visible');
    cy.contains('No data to show').should('be.visible');
    cy.dataCy('icon').should('be.visible');
  });
});
