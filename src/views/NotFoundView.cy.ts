import NotFoundView from './NotFoundView.vue';

describe('<NotFoundView />', () => {
  it('renders 404 page with home button', () => {
    cy.viewport('iphone-xr', 'landscape');
    cy.mount(NotFoundView);

    cy.get('h1').should('be.visible').contains('404');
    cy.contains('Uh-oh!');
    cy.contains('Go Back Home');
  });
});
