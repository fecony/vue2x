import BaseLinkButton from './BaseLinkButton.vue';

describe('<BaseLinkButton />', () => {
  it('renders link with label', () => {
    cy.mount(BaseLinkButton, {
      propsData: {
        to: { name: 'home' },
        label: 'go home',
      },
    });

    cy.contains('go home').should('be.visible');
  });

  it('renders link with label and icon', () => {
    cy.mount(BaseLinkButton, {
      propsData: {
        to: { name: 'home' },
        label: 'go home',
        icon: 'arrow-right',
      },
    });

    cy.contains('go home').should('be.visible');
  });

  it('renders correct link', () => {
    cy.mount(BaseLinkButton, {
      propsData: {
        to: { path: '/somewhere' },
        label: 'go somewhere',
      },
    });

    cy.contains('go somewhere')
      .should('be.visible')
      .should(($a) => {
        const message = $a.text();
        expect($a, message).to.have.attr('href').to.contain('somewhere');
      });
  });
});
